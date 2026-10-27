import logging
from typing import Generator, Optional
from pymongo import MongoClient
from pymongo.database import Database
from app.core.config import settings

logger = logging.getLogger("nyayaai.database")

_mongo_client: Optional[MongoClient] = None

def get_mongo_client() -> MongoClient:
    """Retrieve or initialize singleton MongoClient."""
    global _mongo_client
    if _mongo_client is None:
        mongo_url = getattr(settings, "MONGODB_URL", "mongodb://localhost:27017")
        try:
            _mongo_client = MongoClient(
                mongo_url,
                serverSelectionTimeoutMS=2000,
                connectTimeoutMS=2000
            )
        except Exception as e:
            logger.error(f"Failed to create MongoClient to {mongo_url}: {e}")
            raise
    return _mongo_client

def get_mongo_db() -> Database:
    """Get the active MongoDB database object."""
    client = get_mongo_client()
    db_name = getattr(settings, "MONGODB_DB_NAME", "nyayaai")
    return client[db_name]

def get_db() -> Generator[Database, None, None]:
    """FastAPI Dependency injection yielding the MongoDB database."""
    try:
        db = get_mongo_db()
        yield db
    except Exception as e:
        logger.error(f"Error accessing MongoDB session: {e}")
        raise

def is_db_connected() -> bool:
    """Ping MongoDB server to verify active connectivity."""
    try:
        client = get_mongo_client()
        client.admin.command('ping')
        return True
    except Exception as e:
        logger.warning(f"MongoDB connection ping failed: {e}")
        return False

def init_db():
    """Initialize MongoDB collections, build search indexes, and seed verified datasets."""
    logger.info("Connecting to MongoDB and initializing collections...")
    try:
        client = get_mongo_client()
        db_name = getattr(settings, "MONGODB_DB_NAME", "nyayaai")
        db = client[db_name]

        # Verify connectivity
        client.admin.command('ping')
        logger.info(f"MongoDB connection successful on database '{db_name}'.")

        # Create Indexes for fast querying
        try:
            db.schemes.create_index([("name", "text"), ("description", "text"), ("issuing_department", "text")])
            db.schemes.create_index("beneficiary_category")
            db.schemes.create_index("state_ut")
            db.schemes.create_index("id", unique=True)
        except Exception as idx_err:
            logger.warning(f"Index creation on schemes: {idx_err}")

        try:
            db.legal_aid_resources.create_index([("organization_name", "text"), ("service_description", "text"), ("district", "text")])
            db.legal_aid_resources.create_index("state")
            db.legal_aid_resources.create_index("category")
            db.legal_aid_resources.create_index("id", unique=True)
        except Exception as idx_err:
            logger.warning(f"Index creation on legal_aid_resources: {idx_err}")

        try:
            db.legal_sources.create_index("source_type")
            db.legal_sources.create_index("id", unique=True)
        except Exception as idx_err:
            logger.warning(f"Index creation on legal_sources: {idx_err}")

        try:
            db.audit_events.create_index("event_type")
            db.audit_events.create_index("timestamp")
        except Exception as idx_err:
            logger.warning(f"Index creation on audit_events: {idx_err}")

        # Seed initial data
        from app.data.seed_data import seed_all
        seed_all(db)
        logger.info("Verified statutory datasets verified/seeded into MongoDB.")
    except Exception as e:
        logger.error(f"Failed to initialize MongoDB: {e}")

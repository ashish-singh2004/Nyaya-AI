import re
from typing import Dict, List, Any
from app.schemas.fraud import FraudCheckResponse, FraudPatternDetected

# Cybercrime helplines & official portals
OFFICIAL_HELPLINES = [
    {
        "name": "National Cyber Crime Helpline",
        "number": "1930 (Toll-Free, 24x7)",
        "authority": "Indian Cyber Crime Coordination Centre (I4C), MHA",
        "portal_url": "https://cybercrime.gov.in/",
        "purpose": "Immediate financial cyber fraud reporting to freeze stolen funds in transit"
    },
    {
        "name": "Chakshu - Fraud Communication Reporting",
        "number": "Online Portal",
        "authority": "Department of Telecommunications (DoT), Sanchar Saathi",
        "portal_url": "https://sancharsaathi.gov.in/sfc/",
        "purpose": "Report suspected fraudulent SMS, calls, or WhatsApp messages"
    },
    {
        "name": "RBI Sachet Portal",
        "number": "Online Grievance",
        "authority": "Reserve Bank of India",
        "portal_url": "https://sachet.rbi.org.in/",
        "purpose": "Verify authorized financial entities and report unauthorized deposit-taking schemes"
    }
]

PATTERNS_DB = [
    {
        "name": "Urgent Threat / Coercion",
        "regex": r"(electricity|power|bill).{0,30}(disconnect|cut\s*off|suspended|tonight|9:30|10:00)|account.{0,20}(blocked|suspended|deactivated|frozen)|arrest\s*warrant|fir\s*registered|customs.{0,20}(parcel|drugs|narcotics)|sim.{0,20}(block|deactivate|kyc)",
        "severity": "High",
        "explanation": "Scammers manufacture artificial panic (e.g. power disconnection or police arrest) to rush you into acting without independent verification."
    },
    {
        "name": "Sensitive Credential Solicitation",
        "regex": r"(share|enter|send|provide).{0,25}(otp|one\s*time\s*password|upi\s*pin|atm\s*pin|cvv|password|mpin)|otp\s*is\s*[:\s]*\d{4,8}|enter\s*pin\s*to\s*receive",
        "severity": "High",
        "explanation": "Legitimate banks and government agencies never ask for your OTP, UPI PIN, or passwords to credit funds or verify identity."
    },
    {
        "name": "Suspicious Link / Unknown Domain / APK File",
        "regex": r"https?://[^\s]+|bit\.ly/[^\s]+|tinyurl\.com/[^\s]+|\.apk\b|t\.me/[^\s]+|[a-zA-Z0-9-]+\.(xyz|top|online|site|club|work|vip|buzz|live)/[^\s]*",
        "severity": "High",
        "explanation": "Shortened URLs, .apk file downloads, or obscure top-level domains (.xyz, .online) are frequently used to deploy spyware or phishing pages."
    },
    {
        "name": "Unrealistic Financial Reward / Task / Job Scam",
        "regex": r"(part\s*time|work\s*from\s*home|daily\s*income).{0,30}(earning|earn|₹\s*\d+|\b\d{3,5}\s*per\s*day)|(like|subscribe).{0,20}(youtube|telegram|video).{0,20}(earn|bonus|paid)|congratulations.{0,20}(won|selected|lottery|prize|fund)",
        "severity": "High",
        "explanation": "Unsolicited offers promising large daily earnings for trivial tasks (e.g. YouTube likes or rating hotels) are classic advance-fee task scams."
    },
    {
        "name": "Advance Fee / Processing Charge Demand",
        "regex": r"(pay|deposit|transfer|send).{0,25}(registration\s*fee|activation\s*charge|processing\s*fee|security\s*deposit|clearance\s*charge|tax\s*amount)",
        "severity": "High",
        "explanation": "Requiring a payment before receiving a prize, job, or loan disbursal is a hallmark of advance-fee fraud."
    },
    {
        "name": "Impersonation of Public Authority / Utility / Bank",
        "regex": r"\b(sbi|hdfc|icici|pnb|axis|bank\s*manager|electricity\s*officer|income\s*tax|department\s*of\s*telecom|police\s*headquarters|fedex|dhl)\b",
        "severity": "Medium",
        "explanation": "Fraudulent messages often masquerade as respected institutions to gain instant, unmerited credibility."
    },
    {
        "name": "Reverse UPI Scam Indicator",
        "regex": r"scan\s*(qr|code).{0,25}(receive|claim|credit|accept)|enter.{0,15}pin.{0,25}(receive|get\s*money)",
        "severity": "High",
        "explanation": "Scanning a QR code or entering your UPI PIN always DEBITS (deducts) money from your bank account. It can never credit money."
    }
]

class FraudAnalyzerService:
    @classmethod
    def analyze_message(cls, message_text: str, message_type: str = "sms", is_demo: bool = False) -> FraudCheckResponse:
        sanitized_text = message_text.strip()
        
        # Check for credential leak / prompt
        credential_regex = r"(otp\s*is\s*\d{4,8}|pin\s*is\s*\d{4,6}|password\s*is\s*[:\s]*\S+|my\s*upi\s*pin\s*is)"
        has_sensitive_credential_warning = bool(re.search(r"(otp|upi\s*pin|cvv|password|netbanking|card\s*number)", sanitized_text, re.IGNORECASE))
        credential_warning_details = None
        if has_sensitive_credential_warning:
            credential_warning_details = (
                "Alert: Your message text references confidential credentials (OTP / PIN / Password). "
                "NyayaAI does NOT store credentials. Never transmit OTPs or PINs to any third-party app or website."
            )
            # Redact numbers following OTP/PIN words for safety in preview
            sanitized_text = re.sub(r'(\b\d{4,8}\b)', '****', sanitized_text)

        detected_patterns: List[FraudPatternDetected] = []
        score = 5 # baseline small ambient probability

        for pattern in PATTERNS_DB:
            match = re.search(pattern["regex"], message_text, re.IGNORECASE)
            if match:
                evidence = match.group(0)
                if len(evidence) > 60:
                    evidence = evidence[:57] + "..."
                detected_patterns.append(
                    FraudPatternDetected(
                        pattern_name=pattern["name"],
                        severity=pattern["severity"],
                        evidence_found=f'Found matching text: "{evidence}"',
                        explanation=pattern["explanation"]
                    )
                )
                if pattern["severity"] == "High":
                    score += 30
                else:
                    score += 15

        # Check for links
        has_link = bool(re.search(r"https?://|www\.|\.com/|\.in/|\.xyz/|\.apk", message_text, re.IGNORECASE))
        if has_link and not any(p.pattern_name == "Suspicious Link / Unknown Domain / APK File" for p in detected_patterns):
            detected_patterns.append(
                FraudPatternDetected(
                    pattern_name="External Link in Message",
                    severity="Medium",
                    evidence_found="Message contains embedded web address or hyperlink",
                    explanation="Do not click links received in unsolicited messages. Manually visit the official verified website instead."
                )
            )
            score += 15

        # Cap score between 5 and 98
        score = min(max(score, 5), 98)

        if score >= 60:
            risk_level = "High Risk"
        elif score >= 25:
            risk_level = "Medium Risk"
        else:
            risk_level = "Low Risk"

        safe_next_steps = [
            "Do NOT click any web links or call the mobile numbers provided in the suspicious message.",
            "Never share One-Time Passwords (OTP), UPI PINs, ATM PINs, or bank passwords with anyone.",
            "Remember that scanning a QR code or entering a UPI PIN always deducts money from your account, never credits it.",
            "Verify any electricity or utility disconnection notices directly on the official utility provider app or past physical utility bill.",
            "If money was fraudulently debited, immediately dial 1930 (National Cyber Crime Helpline) within the golden hour to freeze funds.",
            "Report the fraudulent sender number on Chakshu Portal (https://sancharsaathi.gov.in/sfc/)."
        ]

        return FraudCheckResponse(
            risk_level=risk_level,
            risk_score=score,
            has_sensitive_credential_warning=has_sensitive_credential_warning,
            credential_warning_details=credential_warning_details,
            detected_patterns=detected_patterns,
            safe_next_steps=safe_next_steps,
            official_helplines=OFFICIAL_HELPLINES,
            sanitized_preview=sanitized_text[:500] + ("..." if len(sanitized_text) > 500 else ""),
            is_demo=is_demo
        )

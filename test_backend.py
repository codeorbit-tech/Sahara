import httpx
import json
import uuid

BASE_URL = "http://127.0.0.1:8000"
ADMIN_KEY = "sahara-admin-secret-2025"

def print_header(title):
    print("\n" + "=" * 70)
    print(f" [TESTING] {title}")
    print("=" * 70)

def main():
    print(f"Connecting to Sahara FastAPI Backend at {BASE_URL}...\n")
    client = httpx.Client(base_url=BASE_URL, timeout=15.0)

    # 1. Health Check
    print_header("1. GET /api/health")
    res = client.get("/api/health")
    print("Status:", res.status_code)
    print(json.dumps(res.json(), indent=2))
    assert res.status_code == 200

    # Generate a unique student UUID session
    test_session_id = f"student-session-{uuid.uuid4().hex[:8]}"

    # 2. AI Chat & Tag Inference (Exam Stress)
    print_header("2. POST /api/chat (Exam Stress & Tag Inference)")
    payload = {
        "session_id": test_session_id,
        "userMessage": "Exams are starting next week and I'm feeling really stressed and overwhelmed. I can't sleep at night.",
        "currentSeverity": "MODERATE"
    }
    res = client.post("/api/chat", json=payload)
    print("Status:", res.status_code)
    chat_data = res.json()
    print(json.dumps(chat_data, indent=2))
    assert res.status_code == 200
    assert chat_data["session_id"] == test_session_id
    print("Inferred Tags:", chat_data.get("inferredTags"))

    # 3. Crisis Intercept Chat Test
    print_header("3. POST /api/chat (Crisis / Self-harm Trigger Test)")
    payload_crisis = {
        "session_id": test_session_id,
        "userMessage": "I really don't feel safe with myself right now.",
        "currentSeverity": "MODERATE"
    }
    res_crisis = client.post("/api/chat", json=payload_crisis)
    print("Status:", res_crisis.status_code)
    print(json.dumps(res_crisis.json(), indent=2))
    assert res_crisis.status_code == 200
    assert res_crisis.json()["suggestedSeverity"] == "SEVERE"

    # 4. Auto-Generated Session ID when client sends None
    print_header("4. POST /api/chat (Auto Session UUID Generation when None)")
    res_auto = client.post("/api/chat", json={"userMessage": "Hello Sahara, I'm having trouble focusing on studies."})
    print("Status:", res_auto.status_code)
    auto_session = res_auto.json()["session_id"]
    print(f"Generated Session ID: {auto_session}")
    assert auto_session.startswith("sess-")

    # 5. Get Chat History
    print_header("5. GET /api/chat/history")
    res = client.get(f"/api/chat/history?sessionId={test_session_id}")
    print("Status:", res.status_code)
    msgs = res.json().get("messages", [])
    print(f"Retrieved {len(msgs)} messages from chat log.")
    assert len(msgs) >= 4

    # 6. Submit Daily Mood Check-In
    print_header("6. POST /api/checkins (Daily Mood Check-In)")
    checkin_payload = {
        "session_id": test_session_id,
        "mood": "Anxious",
        "energy": 2,
        "stressor": "Midterm Exams & Sleep",
        "note": "Could not sleep past 3 AM thinking about assignment deadlines."
    }
    res = client.post("/api/checkins", json=checkin_payload)
    print("Status:", res.status_code)
    print(json.dumps(res.json(), indent=2))
    assert res.status_code == 200

    # 7. Saathi Directory Access Control (Admin vs Unauthorized)
    print_header("7. GET /api/saathis (Access Control: 401 without Key, 200 with X-Admin-Key)")
    unauth_res = client.get("/api/saathis")
    print("Unauthorized Status (expected 401):", unauth_res.status_code)
    assert unauth_res.status_code == 401

    auth_res = client.get("/api/saathis", headers={"X-Admin-Key": ADMIN_KEY})
    print("Admin Auth Status (expected 200):", auth_res.status_code)
    saathis = auth_res.json()
    print(f"Found {len(saathis)} Saathis in admin directory. Sample Saathi: Name={saathis[0]['name']}, Alias={saathis[0]['alias']}")
    assert auth_res.status_code == 200

    # 8. Server-Side Dual-Saathi Matching
    print_header("8. POST /api/saathi/match (Server-Side Intelligent Dual Match)")
    match_payload = {"session_id": test_session_id}
    res_match = client.post("/api/saathi/match", json=match_payload)
    print("Status:", res_match.status_code)
    match_data = res_match.json()
    print(json.dumps(match_data, indent=2))
    assert res_match.status_code == 200
    primary = match_data["primary"]
    secondary = match_data["secondary"]
    print(f"Assigned PRIMARY: {primary['alias']} (Chat ID: {primary['chat_id']})")
    print(f"Assigned SECONDARY: {secondary['alias']} (Chat ID: {secondary['chat_id']})")

    # 9. Send Message to Primary Saathi
    print_header("9. POST /api/saathi/chat/{chat_id}/message")
    msg_payload = {
        "saathi_chat_id": primary["chat_id"],
        "sender": "student",
        "text": f"Hi {primary['alias']}, exam pressure is really stressing me out."
    }
    res_msg = client.post(f"/api/saathi/chat/{primary['chat_id']}/message", json=msg_payload)
    print("Status:", res_msg.status_code)
    print(json.dumps(res_msg.json(), indent=2))
    assert res_msg.status_code == 200

    # 10. Student-Side No-Guilt Switch
    print_header("10. POST /api/saathi/switch (Toggle Focus to SECONDARY)")
    switch_res = client.post("/api/saathi/switch", json={"session_id": test_session_id, "target_role": "SECONDARY"})
    print("Status:", switch_res.status_code)
    print(json.dumps(switch_res.json(), indent=2))
    assert switch_res.status_code == 200

    # 11. Saathi Step-Back Transition (with 2-week notice and history transfer consent)
    print_header("11. POST /api/saathi/transition (Saathi Transition with Consent)")
    trans_payload = {
        "saathi_chat_id": primary["chat_id"],
        "notice_weeks": 2,
        "consented_history_transfer": True
    }
    trans_res = client.post("/api/saathi/transition", json=trans_payload)
    print("Status:", trans_res.status_code)
    print(json.dumps(trans_res.json(), indent=2))
    assert trans_res.status_code == 200

    # 12. Saathi Silent Escape Hatch (Reassign Request)
    print_header("12. POST /api/saathi/reassign-request (Silent Escape Hatch)")
    reassign_res = client.post("/api/saathi/reassign-request", json={"saathi_chat_id": secondary["chat_id"]})
    print("Status:", reassign_res.status_code)
    print(json.dumps(reassign_res.json(), indent=2))
    assert reassign_res.status_code == 200

    # 13. Verified Counsellors & Isolated Appointment Booking
    print_header("13. GET /api/counsellors & POST /api/appointments")
    counsellors = client.get("/api/counsellors").json()
    print(f"Available Counsellors: {len(counsellors)}")
    apt_payload = {
        "counsellor_id": counsellors[0]["id"],
        "counsellor_name": counsellors[0]["name"],
        "student_name": "Kavya S.",
        "student_email": "kavya@campus.edu",
        "modality": "Video",
        "selected_slot": "Tomorrow, 3:00 PM",
        "notes": "Discussing exam panic."
    }
    apt_res = client.post("/api/appointments", json=apt_payload)
    print("Status:", apt_res.status_code)
    print(json.dumps(apt_res.json(), indent=2))
    assert apt_res.status_code == 200

    # 14. Analytics Access Control
    print_header("14. GET /api/analytics (Admin Key Verification)")
    analytics_unauth = client.get("/api/analytics")
    print("Unauthorized Analytics Status (expected 401):", analytics_unauth.status_code)
    assert analytics_unauth.status_code == 401

    analytics_auth = client.get("/api/analytics", headers={"X-Admin-Key": ADMIN_KEY})
    print("Admin Analytics Status (expected 200):", analytics_auth.status_code)
    print("Student Trust Score:", analytics_auth.json().get("studentTrustScore"))
    assert analytics_auth.status_code == 200

    print("\n" + "=" * 70)
    print(" SUCCESS: ALL V2 PRIVACY-HARDENED BACKEND TESTS PASSED!")
    print("=" * 70)

if __name__ == "__main__":
    main()

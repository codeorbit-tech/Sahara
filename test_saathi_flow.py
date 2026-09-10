import httpx
import json

BASE_URL = "http://127.0.0.1:8000"

def main():
    print("Testing Saathi Portal Message Sync Flow...")
    client = httpx.Client(base_url=BASE_URL, timeout=10.0)

    # 1. Login to Saathi Portal as Zakwan
    print("\n--- 1. Login as Saathi (Zakwan) ---")
    login_res = client.post("/api/saathi/auth/login", json={"username": "zakwan", "password": "SaharaPeer2025!"})
    assert login_res.status_code == 200, f"Login failed: {login_res.text}"
    token = login_res.json()["token"]
    headers = {"Authorization": f"Bearer {token}"}
    print("Logged in successfully. Saathi ID:", login_res.json()["saathi_id"])

    # 2. Student starts chat and gets matched with Saathi
    session_id = "test-saathi-sync-session-999"
    print(f"\n--- 2. Student sends distress message to /api/chat (Session: {session_id}) ---")
    chat_res = client.post("/api/chat", json={
        "session_id": session_id,
        "userMessage": "I feel so overwhelmed with exam stress and assignment deadlines.",
        "currentSeverity": "MODERATE"
    })
    assert chat_res.status_code == 200
    print("AI Chat Response:", chat_res.json().get("reply"))

    # Explicitly trigger peer match for this session
    match_res = client.post("/api/saathi/match", json={"session_id": session_id})
    assert match_res.status_code == 200
    chat_id = match_res.json()["primary"]["chat_id"]
    saathi_alias = match_res.json()["primary"]["alias"]
    print(f"Matched with Saathi ({saathi_alias}). Primary Chat ID: {chat_id}")

    # 3. Student sends another message to the Saathi
    print("\n--- 3. Student sends message directly to Saathi ---")
    student_msg_text = "Hi Aadhya, I'm feeling really stressed about placement interviews and 3 AM code errors."
    msg_res = client.post(f"/api/saathi/chat/{chat_id}/message", json={
        "saathi_chat_id": chat_id,
        "sender": "student",
        "text": student_msg_text
    })
    assert msg_res.status_code == 200
    print("Student message sent successfully.")

    # 4. Check Saathi Portal Inbox (as Saathi)
    print("\n--- 4. Checking Saathi Portal Inbox (/api/saathi/inbox/chats?scope=all) ---")
    inbox_res = client.get("/api/saathi/inbox/chats?scope=all", headers=headers)
    assert inbox_res.status_code == 200
    chats = inbox_res.json()
    print(f"Total active chats in Saathi Inbox: {len(chats)}")
    
    target_chat = next((c for c in chats if c["chat_id"] == chat_id), None)
    assert target_chat is not None, "Chat not found in Saathi Inbox!"
    print("Reflected Chat Summary in Saathi Portal:")
    print("  - Student Alias:", target_chat["student_alias"])
    print("  - Last Message Sender:", target_chat["last_message_sender"])
    print("  - Last Message Text:", target_chat["last_message_text"])
    print("  - Total Messages:", target_chat["total_messages"])

    assert target_chat["last_message_sender"] == "student", f"Expected 'student', got '{target_chat['last_message_sender']}'"
    assert target_chat["last_message_text"] == student_msg_text, "Last message text mismatch!"

    # 5. Saathi replies from Saathi Portal
    print("\n--- 5. Saathi replies from Saathi Portal (/api/saathi/inbox/chat/{chat_id}/reply) ---")
    saathi_reply_text = "Hey! I completely get that 3 AM burnout feeling. Take a slow breath, you don't have to carry this alone."
    reply_res = client.post(f"/api/saathi/inbox/chat/{chat_id}/reply", headers=headers, json={"text": saathi_reply_text})
    assert reply_res.status_code == 200
    print("Saathi reply posted:", reply_res.json()["text"])

    # 6. Verify Student sees Saathi reply in chat history
    print("\n--- 6. Student checks chat history (/api/chat/history) ---")
    history_res = client.get(f"/api/chat/history?sessionId={session_id}")
    assert history_res.status_code == 200
    messages = history_res.json()["messages"]
    last_msg = messages[-1]
    print(f"Latest message in Student Chat History: [{last_msg['sender'].upper()}]: {last_msg['text']}")

    assert last_msg["sender"] == "saathi", f"Expected 'saathi', got '{last_msg['sender']}'"
    assert last_msg["text"] == saathi_reply_text, "Student did not receive exact Saathi reply!"

    print("\n============================================================")
    print(" SUCCESS: STUDENT MESSAGES REFLECT CLEANLY IN SAATHI PORTAL!")
    print(" AND SAATHI HUMAN REPLIES REFLECT CLEANLY BACK TO STUDENT!")
    print("============================================================")

if __name__ == "__main__":
    main()

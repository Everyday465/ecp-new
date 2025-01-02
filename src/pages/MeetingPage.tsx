import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';  // Import useHistory for redirection

const MeetingPage = () => {
    const [userName, setUserName] = useState("");
    const [meetingLink, setMeetingLink] = useState("");
    const [attendeeId, setAttendeeId] = useState("");
    const [meetingId, setMeetingId] = useState("");
    const [error, setError] = useState("");
    
    const history = useHistory();  // For redirecting

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await fetch(
                'https://2w5lk3kp60.execute-api.us-east-1.amazonaws.com/dev/meeting',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userName }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                setMeetingLink(data.meetingLink);
                setAttendeeId(data.attendeeId);
                setMeetingId(data.meetingId);

                // Redirect to the meeting room page with meetingId and userName as state
                history.push({
                    pathname: '/MeetingRoomPage',
                    state: { name: userName, meetingId }
                });
            } else {
                setError(data.error || "Failed to create meeting.");
            }
        } catch (error) {
            setError('Error creating meeting.');
        }
    };

    return (
        <div>
            <h1>Join Your Meeting</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Your Name:
                    <input
                        type="text"
                        value={userName}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <button type="submit">Create Meeting</button>
            </form>

            {meetingLink && <p>Meeting Link: <a href={meetingLink} target="_blank" rel="noopener noreferrer">Join Meeting</a></p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default MeetingPage;

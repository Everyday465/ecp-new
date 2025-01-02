import { useState, useEffect } from 'react';
import * as ChimeSDK from 'amazon-chime-sdk-js';

const MeetingPage = () => {
  const [response, setResponse] = useState<string>(''); 
  const [meetingSession, setMeetingSession] = useState<ChimeSDK.DefaultMeetingSession | null>(null);
  const [userName, setUserName] = useState<string>(''); 
  const [attendees, setAttendees] = useState<Set<string>>(new Set());
  const [shareableLink, setShareableLink] = useState<string>(''); // State for shareable link

  const logger = new ChimeSDK.ConsoleLogger('ChimeMeetingLogs', ChimeSDK.LogLevel.INFO);
  const deviceController = new ChimeSDK.DefaultDeviceController(logger);

  const handleVideoUpdates = () => {
    if (!meetingSession) return;

    meetingSession.audioVideo.getAllVideoTiles().forEach(tile => {
      const tileState = tile.state();
      if (!tileState?.tileId) return;

      let divElement = document.getElementById(`div-${tileState.tileId}`);
      if (!divElement) {
        divElement = document.createElement('div');
        divElement.id = `div-${tileState.tileId}`;
        const videoElement = document.createElement('video');
        videoElement.id = `video-${tileState.tileId}`;
        videoElement.autoplay = true;
        videoElement.style.width = '300px';
        videoElement.style.height = '200px';
        divElement.appendChild(videoElement);
        document.getElementById('video-list')?.appendChild(divElement);

        meetingSession.audioVideo.bindVideoElement(tileState.tileId, videoElement);
      }
    });
  };

  const attendeeObserver = (_attendeeId: string, present: boolean, externalUserId?: string) => {
    const attendeeName = externalUserId?.split('#')[0] || 'Unknown User';
    setAttendees((prev) => {
      const updatedSet = new Set(prev);
      if (present) updatedSet.add(attendeeName);
      else updatedSet.delete(attendeeName);
      return updatedSet;
    });
  };

  const joinMeeting = async () => {
    if (!userName.trim()) {
      alert('Please enter your name');
      return;
    }
  
    if (userName.includes('#')) {
      alert('Special characters like # are not allowed');
      return;
    }
  
    let meetingIdFromURL = new URLSearchParams(window.location.search).get('meetingId') || '';
  
    try {
      const response = await fetch(
        'https://yjfs7k6xp9.execute-api.us-east-1.amazonaws.com/dev/meetings',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'DO_MEETING',
            USERNAME: userName,
            MEETING_ID: meetingIdFromURL,
          }),
        }
      );
  
      const data = await response.json();
      if (!data?.Info) {
        alert('Failed to initialize meeting');
        return;
      }
  
      const sessionConfig = new ChimeSDK.MeetingSessionConfiguration(
        data.Info.Meeting.Meeting,
        data.Info.Attendee.Attendee
      );
  
      const newMeetingSession = new ChimeSDK.DefaultMeetingSession(
        sessionConfig,
        logger,
        deviceController
      );
  
      setMeetingSession(newMeetingSession);
  
      const audioDevices = await newMeetingSession.audioVideo.listAudioInputDevices();
      const videoDevices = await newMeetingSession.audioVideo.listVideoInputDevices();
  
      if (audioDevices.length) await newMeetingSession.audioVideo.chooseAudioInputDevice(audioDevices[0].deviceId);
      if (videoDevices.length) await newMeetingSession.audioVideo.chooseVideoInputDevice(videoDevices[0].deviceId);
      
      newMeetingSession.audioVideo.addObserver({
        videoTileDidUpdate: handleVideoUpdates,
      });
  
      newMeetingSession.audioVideo.realtimeSubscribeToAttendeeIdPresence(attendeeObserver);
      newMeetingSession.audioVideo.start();
      newMeetingSession.audioVideo.startLocalVideoTile();
  
      setResponse('Meeting started');
      setShareableLink(data.Info.ShareableLink);
    } catch (error) {
      console.error('Error joining meeting:', error);
      alert('An unexpected error occurred');
    }
  };
  

  const cleanupMeeting = () => {
    if (meetingSession) {
      meetingSession.audioVideo.stopLocalVideoTile();
      meetingSession.audioVideo.realtimeUnsubscribeToAttendeeIdPresence(attendeeObserver);
      meetingSession.audioVideo.stop();
      setMeetingSession(null);
    }

    setResponse('');
    document.getElementById('video-list')?.replaceChildren();
    setAttendees(new Set());
  };

  useEffect(() => {
    return () => cleanupMeeting();
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', marginTop: '50px' }}>
      <h1>Amazon Chime SDK Demo</h1>
      <div>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter your name"
          style={{ marginBottom: '10px', padding: '5px' }}
        />
        <br />
        <button onClick={joinMeeting} style={{ marginRight: '10px' }}>
          Join Meeting
        </button>
        <button onClick={cleanupMeeting}>Leave Meeting</button>
      </div>
      <p style={{ marginTop: '10px' }}>{response}</p>
      
      {/* Shareable Meeting Link Section */}
      {shareableLink && (
        <div style={{ marginTop: '20px' }}>
          <p>Share this link with others to join the meeting:</p>
          <a href={shareableLink} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff' }}>
            {shareableLink}
          </a>
        </div>
      )}

      <div id="video-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }} />
      <div style={{ marginTop: '20px' }}>
        <strong>Current Attendees:</strong> {Array.from(attendees).join(', ')}
      </div>
    </div>
  );
};

export default MeetingPage;

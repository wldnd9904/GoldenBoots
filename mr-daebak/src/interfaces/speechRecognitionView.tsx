import Modal from 'react-bootstrap/Modal';
import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

interface IModalForm{
    show: boolean;
    handleClose: ()=>void;
  };

function SpeechRecognitionView({show, handleClose}:IModalForm) {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition()

  return (
        <Modal
        show={show}
        onHide={handleClose}
        keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>음성 주문</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
                !browserSupportsSpeechRecognition?
                <span>브라우저가 음성 인식을 지원하지 않습니다.</span>
                :
                <div>
                    <p>Microphone: {listening ? 'on' : 'off'}</p>
                    <button onClick={()=>SpeechRecognition.startListening({continuous:true, language:"ko"})}>Start</button>
                    <button onClick={SpeechRecognition.stopListening}>Stop</button>
                    <button onClick={resetTranscript}>Reset</button>
                    <p>{transcript}</p>
                </div>
            }
          </Modal.Body>
          <Modal.Footer>

          </Modal.Footer>
        </Modal>
  );
};
export default SpeechRecognitionView;
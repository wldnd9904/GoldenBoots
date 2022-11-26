import Modal from 'react-bootstrap/Modal';
import React, { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useRecoilState } from 'recoil';
import OrderManager, { orderListAtom } from '../Order/OrderManager';
import MenuManager, { detailListAtom, dinnerListAtom, styleListAtom } from '../Order/MenuManager';

interface IModalForm{
    show: boolean;
    handleClose: ()=>void;
  };

function SpeechRecognitionView({show, handleClose}:IModalForm) {
  const [orderList, setOrderList] = useRecoilState(orderListAtom);
  const [detailList, setDetailList] = useRecoilState(detailListAtom);
  const [dinnerList, setDinnerList] = useRecoilState(dinnerListAtom);
  const [styleList, setStyleList] = useRecoilState(styleListAtom);
  const {transcript,listening,resetTranscript,browserSupportsSpeechRecognition} = useSpeechRecognition();
  useEffect(()=>{(async ()=>{
    if(!detailList)setDetailList(await MenuManager.getDetailedMenuTypeList());
    if(!dinnerList)setDinnerList(await MenuManager.getDinnerList());
    if(!styleList)setStyleList(await MenuManager.getStyleList());
  })();},[]);
  const stopListening = () =>{
    SpeechRecognition.stopListening();
    setOrderList([...orderList,OrderManager.textToOrder(transcript,dinnerList,styleList,detailList)]);
  }
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
                    <p>{listening ? '음성 인식 중' : '대기 중'}</p>
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
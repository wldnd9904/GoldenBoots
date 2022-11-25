import { useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useRecoilState } from 'recoil';
import { IStyle } from '../Order/Menu';
import MenuManager, { styleListAtom } from '../Order/MenuManager';
import Style from './styleView';


function StyleList(){
  const [StyleListData, setStyleListData] = useRecoilState(styleListAtom);
  const newStyle = () => {(async ()=>{
    await MenuManager.addStyle();
    alert("새 메뉴가 추가되었습니다.");
  })();}
  useEffect(()=>{
    (async()=>{
        await setStyleListData(await MenuManager.getStyleList());
    })();
  },[]);
    return(
        <div style={{padding:"20px"}}>
            <Row xs={1} md={1} lg={1} className="g-4">
                { StyleListData?
                StyleListData.map((style:IStyle, idx) => (
                    <Col key={idx}>
                        <Style key={idx} {...style}/>
                    </Col>
                )):null
                }
            </Row>
            <Button style={{marginTop:"20px"}} variant="primary" onClick={newStyle}>새 스타일</Button>
        </div>
    );
}

export default StyleList;
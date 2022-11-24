import { useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useRecoilState } from 'recoil';
import { IDinner } from '../Order/Menu';
import MenuManager, { dinnerListAtom } from '../Order/MenuManager';
import Dinner from './dinnerView';


function DinnerList(){
  const [dinnerListData, setDinnerListData] = useRecoilState(dinnerListAtom);
  const newDinner = () => {(async ()=>{
    await MenuManager.addDinner();
    alert("새 메뉴가 추가되었습니다.");
  })();}
  useEffect(()=>{
    (async()=>{
        await setDinnerListData(await MenuManager.getDinnerList());
    })();
  },[]);
    return(
        <div style={{padding:"20px"}}>
            <Row xs={1} md={1} lg={1} className="g-4">
                { dinnerListData?
                dinnerListData.map((dinner:IDinner, idx) => (
                    <Col key={idx}>
                        <Dinner key={idx} {...dinner}/>
                    </Col>
                )):null
                }
            </Row>
            <Button style={{marginTop:"20px"}} variant="primary" onClick={newDinner}>새 디너</Button>
        </div>
    );
}

export default DinnerList;
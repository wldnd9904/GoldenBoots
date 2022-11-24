import { appendFileSync } from 'fs';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { useRecoilState, useRecoilTransaction_UNSTABLE, useRecoilValue } from 'recoil';
import { IVoucher } from '../Homepage/Voucher';
import VoucherManager, { voucherDataAtom } from '../Homepage/VoucherManager';
import MenuManager, { detailListAtom } from '../Order/MenuManager';
import { userDataAtom } from '../People/PeopleManager';
import StockManager, { stockDataAtom } from '../Resources/StockManager';
import VoucherView from './voucherView';


function ResourceList(){
    const [resourceList, setResourceList] = useRecoilState(detailListAtom);
    const [stockData, setStockData] = useRecoilState(stockDataAtom);
    const apply= async (resource:string,stock:string,price:string)=>{
        await StockManager.setStock(resource, stock, price);
    }
    useEffect(()=>{(async () =>{
        setResourceList(await MenuManager.getDetailedMenuTypeList());
        setStockData(await StockManager.getStock());
    })();
},[])
    return(
        <div style={{padding:"20px"}}>
            <Row xs={1} md={2} lg={3} className="g-4">
                { stockData?
                Object.keys(stockData).map((key, idx) => (
                    <Col key={idx}>
                        <span>{resourceList[key].label}</span>
                        <br/>
                        <span>수량:</span>
                        <input type="text" defaultValue={stockData[key]?stockData[key]:0}/>
                        <br/>
                        <span>가격:</span>
                        <input type="text" defaultValue={resourceList[key]?resourceList[key].price:0}/>
                        <Button onClick={(e)=>{
                            const parent=e.currentTarget.parentElement;
                            if(!parent)return;
                            const name=resourceList[key].name;
                            const stock=parent.getElementsByTagName("input")[0].value;
                            const price=parent.getElementsByTagName("input")[1].value;
                            apply(name,stock?stock:"",price?price:"");
                        }}>적용하기</Button>
                    </Col>
                )):null}
            </Row>
        </div>
    );
}

export default ResourceList;
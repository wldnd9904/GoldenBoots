import { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

interface IDetailedMenu{
    id:number;
    name: string;
    isCountable: boolean;
    action: (a:string)=>void;
  }
  const quantity = [
    { name: '빼기', value: '-1' },
    { name: '적게', value: '0' },
    { name: '보통', value: '1' },
    { name: '많이', value: '2' },
  ];
  const count = [
    { name: '0', value: '0' },
    { name: '1', value: '1' },
    { name: '2', value: '2' },
    { name: '3', value: '3' },
    { name: '4', value: '4' },
    { name: '5', value: '5' },
  ];
  function DetailedMenu(params:IDetailedMenu){
    const [radioValue, setRadioValue] = useState('1');
    const type = params.isCountable?count:quantity;
    return (
      <>
        {params.name}
      <ButtonGroup>
        {type.map((radio,idx)=>(
        <ToggleButton
                  id={`${params.id}_${idx}`}
                  type="radio"
                  variant="outline-primary"
                  name={radio.name}
                  value={radio.value}
                  checked={radioValue == radio.value}
                  onChange={(e) => {setRadioValue(e.currentTarget.value)}}
                >
                  {radio.name}
        </ToggleButton>
        ))}
      </ButtonGroup>
      </>
    );
  }

  export default DetailedMenu;
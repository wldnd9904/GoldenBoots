import { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { IDetailedMenuType } from '../Order/Menu';


  function DetailedMenu(params:IDetailedMenuType){
    const [value, setValue] = useState<number>(1);
    return (
      <>
        <h2>{params.label}</h2>
        {
          {
            'Q':<ButtonGroup>
                  
                </ButtonGroup>,
            'C':<>
                </>,
            'B':<ButtonGroup>
                  <ToggleButton
                  id={`${params.name}_true`}
                  type="radio"
                  variant="outline-primary"
                  name="넣기"
                  value={1}
                  checked={value === 1}
                  onClick={()=>setValue(1)}>
                  "넣기"
                  </ToggleButton>
                  <ToggleButton
                  id={`${params.name}_false`}
                  type="radio"
                  variant="outline-primary"
                  name="빼기"
                  value={0}
                  checked={value === 0}
                  onClick={()=>setValue(0)}>
                  "빼기"
                  </ToggleButton>
                </ButtonGroup>,
          }[params.type]
        }
      </>
    );
  }

  export default DetailedMenu;
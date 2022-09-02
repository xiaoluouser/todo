import React, { useEffect, useState } from 'react';
import { SkinOutlined } from '@ant-design/icons';

import './Skinning.less';

function Skinning(props) {
  let { isFloatList, getChangeColor,color } = props;
  const [colorList] = useState([
    { id: '#5E72C0', color: '#5E72C0', isSelect: true },
    { id: '#FFE4E9', color: '#FFE4E9', isSelect: false },
    { id: '#D4F1EF', color: '#D4F1EF', isSelect: false },
    { id: '#B573B5', color: '#B573B5', isSelect: false },
    { id: '#FFE100', color: '#FFE100', isSelect: false },
    { id: '#1E96FF', color: '#1E96FF', isSelect: false },
    { id: '#CA64EA', color: '#CA64EA', isSelect: false },
  ]);
  useEffect(() => {
    document.addEventListener("click", () => {
      setShowList(false);
    })
  }, [])
  //点击是否显示切换主题的菜单
  let [showList, setShowList] = useState(false);
  const showcolorList = (e) => {
    e.nativeEvent.stopImmediatePropagation();
    setShowList(true);
  }
  //点击切换主题色
  const changecolor = (color) => {
    colorList.forEach(item => {
      item.isSelect = false;
      if (item.color === color) {
        item.isSelect = true;
      }
    })
    getChangeColor(color);
  }
  useEffect(() => {
    colorList.forEach(item => {
      item.isSelect = false;
      if (item.color === color) {
        item.isSelect = true;
      }
    })
  },[colorList,color])
  return (
    <div className={isFloatList ? 'float-skinning' : 'skinning'} onClick={showcolorList}>
      <SkinOutlined title='换肤' />
      <ul className="skinning-list"
        style={{ height: `${showList ? '200px' : '0'}` }}>
        {colorList.map(item => {
          return (<li
            key={item.id}
            style={item.isSelect ? { background: `${item.color}`, border: '3px solid rgb(61, 61, 61)' } : { background: `${item.color}` }}
            onClick={() => changecolor(item.color)}
          ></li>)
        })}
      </ul>
    </div>
  )
}

export default Skinning;
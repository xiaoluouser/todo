import React, { useRef, useState } from 'react';
import { Button, Empty } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import PubSub from 'pubsub-js';
import moment from 'moment';
import DiaryItem from '@/components/DiaryItem/DiaryItem.jsx';
import Skinning from '@/components/Skinning/Skinning.jsx';
import TextEditor from '@/components/TextEditor/TextEditor.jsx';
import DiaryDetail from '@/components/DiaryDetail/DiaryDetail.jsx';

import './MyDay.less';

function MyDay() {
  const [data, setData] = useState([
    {
      avatar: "https://joeschmoe.io/api/v1/random",
      title: 'Ant Design Title 1',
      description: "Ant Design, a design language for background applications, is refined by Ant UED Team",
      time: '7/21',
    },
    {
      avatar: "https://joeschmoe.io/api/v1/random",
      title: 'Ant Design Title 2',
      description: "Ant Design, a design language for background applications, is refined by Ant UED Team",
      time: '7/21',
    },
  ])
  //滚动到一定程度浮动显示切换皮肤的图标
  let [isFloatList, setIsFloatList] = useState(false);
  const scrollPage = (e) => {
    setIsFloatList(false);
    if (e.target.scrollTop >= 52) {
      setIsFloatList(true);
    }
  }
  //获取改变之后的颜色
  let [theme, setTheme] = useState('#5E72C0');
  const getChangeColor = (color) => {
    setTheme(color);
  }
  //获取write-dairy的ref
  let writeDiaryNode = useRef(null);
  let [structure, setStructure] = useState(<></>)
  //结构打开的动画
  const isShowStructure = (radius, width, height, display, title, sValue) => {
    writeDiaryNode.current.style.borderRadius = radius;
    writeDiaryNode.current.style.width = width;
    writeDiaryNode.current.style.height = height;
    writeDiaryNode.current.children[0].style.display = display;
    writeDiaryNode.current.setAttribute('title', title);
    setStructure(sValue);
  }

  //获取富文本的内容
  let [a,seta]=useState();
  const getContent = (description,content) => {
    setData([{
      avatar: "https://joeschmoe.io/api/v1/random",
      title: moment().format("MM-DD HH:mm"),
      description: content,
      time: moment().format("MM-DD HH:mm"),
    },...data])
    console.log(description,'@',content);
    seta(content);
  }

  //通过事件委派的方式来绑定事件
  const writeDiary = (e) => {
    switch (e.target.dataset.info) {
      case 'write-diary':
        isShowStructure('10px', '60%', '85%', 'none', '', structureValue);
        break;
      case 'cancel':
        isShowStructure('50%', '70px', '70px', '', '写日记', <></>);
        break;
      case 'ok':
        console.log("nihao");
        break;
      default:
        break;
    }
  }
  //进入日记的详情里面
  const intoDiary=(title)=>{
    PubSub.publish('intoDiary',{title,isInto:true});
  }

  //要添加结构的jsx
  const structureValue = (
    <>
      <p className='title'>写日记</p>
      <div className='diary-content'>
        <TextEditor getContent={getContent}></TextEditor>
      </div>
      <div className="btn">
        <Button className='cancel' danger ghost data-info="cancel">取消</Button>
        <Button className='ok' ghost data-info="ok">确定</Button>
      </div>
    </>
  )
  //状态为空时的图标
  let diaryContent =
    <Empty
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      imageStyle={{ height: 150 }}
      description={'暂无日记'}
    ></Empty>
  if (data.length) {
    diaryContent =
      <div className='diary-content-list'>
        <DiaryItem data={data} intoDiary={intoDiary}></DiaryItem>
      </div>
  }
  return (
    <div onClick={writeDiary} className='my-day' style={{ background: `${theme}` }} onScroll={scrollPage}>
      <div className="content-top-bar">
        <div className="title">
          <span>我的一天</span>
          <p className='describe'>开始记录这一天发生的美好事情吧！</p>
        </div>
        <Skinning
          isFloatList={isFloatList}
          getChangeColor={getChangeColor}>
        </Skinning>
      </div>
      {diaryContent}
      <div dangerouslySetInnerHTML={{__html:a}}></div>
      <div className='write-diary' title='写日记' ref={writeDiaryNode} data-info='write-diary'>
        <PlusOutlined style={{ color: theme, marginLeft: '10px', fontSize: '50px', lineHeight: '80px' }} />
        {structure}
      </div>
      <DiaryDetail></DiaryDetail>
    </div>
  )
}

export default MyDay;

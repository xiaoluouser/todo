import React from 'react';
import DiaryItem from '@/components/DiaryItem/DiaryItem.jsx';

function ImportantDiary() {
  const data = [
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
  ]
  return (
    <div style={{ width: '80%', margin: '0 auto', paddingBottom: '100px', }}>
      <DiaryItem data={data}></DiaryItem>
    </div>
  )
}

export default ImportantDiary;

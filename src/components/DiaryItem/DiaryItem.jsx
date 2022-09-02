import React from 'react';
import { Avatar, List } from 'antd';
import { FieldTimeOutlined } from '@ant-design/icons';

import './DiaryItem.less';

function DiaryItem(props) {
    const { data, intoDiary } = props;
    const intoItem = (title) => {
        return () => {
            intoDiary(title);
        }
    }
    return (
        <List
            className='list'
            itemLayout="horizontal"
            locale={{ emptyText: ' ' }}
            dataSource={data}
            renderItem={(item) => (
                <div onClick={intoItem(item.title)}>
                    <List.Item >
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar} />}
                            title={item.title}
                            description={item.description}
                        />
                        <p className='time'><FieldTimeOutlined />{item.time}</p>
                    </List.Item>
                </div>
            )}
        />
    )
}

export default DiaryItem;
import React from 'react'
import { Space, Typography } from 'antd'
import { FacebookOutlined, ChromeOutlined } from '@ant-design/icons'

const { Text } = Typography

const Footer = () => {
    return (
        <div className={'footer-container'}>
            <img width={164} height={50} href='./public/logo_full' alt='Logo SKOB'/>
            <Space direction='vertical' style={{ justifyContent: 'flex-end' }}>
                <Space>
                    <Text italic>Follow: </Text>
                    <a href='https://www.facebook.com/skobroudnice' target='_blank' rel="noreferrer">
                        <FacebookOutlined style={{ fontSize: '1.5rem' }} />
                    </a>
                    <a href='https://obroudnice.cz/' target='_blank' rel="noreferrer">
                        <ChromeOutlined style={{ fontSize: '1.5rem' }} />
                    </a>
                </Space>
                <Text italic>Design made by &copy; <a href='mailto: email@petrbuk.cz'>Petr Buk</a></Text>
            </Space>
        </div>
    )
}

export default Footer
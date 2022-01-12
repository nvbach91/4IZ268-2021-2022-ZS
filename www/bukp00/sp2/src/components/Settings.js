import React, { useState } from 'react'
import { Menu, Dropdown, InputNumber, Tooltip, Switch, Button } from 'antd'
import { SettingOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

import HighlightInput from './HighlightInput'

import { usePersonalSettings } from '../hooks/useStore'

const Settings = () => {

    const [visible, setVisible] = useState(false);

    const navigate = useNavigate()

    const handleMenuClick = (e) => {
        // console.log(e)
    }

    const handleVisibleChange = (flag) => {
        setVisible(flag)
    }

    const onRaceSelect = () => {
        navigate('~bukp00/sp2/')
    }

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key={1}>
                <div>
                    <span>Zvýraznit oddíl: </span>
                    <Tooltip
                        title={<span>Veřejné API nenabízí výpis všech klubů, proto v nabídce najdete pouze ty kluby, které již byly vypsané v tabulce.</span>}
                    >
                        <InfoCircleOutlined style={{ color: 'rgba(20, 170, 20, 0.7)' }} />
                    </Tooltip>
                    <br />
                    <HighlightInput />
                </div>
            </Menu.Item>
            <Menu.Item key={2}>
                <div>
                    <RefetchIntervalInput />
                </div>
            </Menu.Item>
            <Menu.Item key={3}>
                <div>
                    <Button onClick={onRaceSelect}>Vybrat závod</Button>
                </div>
            </Menu.Item>
        </Menu>
    )

    return (
        <Dropdown
            overlay={menu}
            onVisibleChange={handleVisibleChange}
            visible={visible}
        >
            <SettingOutlined
                style={{ fontSize: '1.5rem', color: 'rgba(255, 255, 255, 0.7)' }}
                onClick={() => setVisible(true)}
            />
        </Dropdown>
    )
}

export default Settings;

const RefetchIntervalInput = () => {

    const refetchInterval = usePersonalSettings((state) => state.refetchInterval)
    const setRefetchInterval = usePersonalSettings((state) => state.setRefetchInterval)
    const autoRefetch = usePersonalSettings((state) => state.autoRefetch)
    const setAutoRefetch = usePersonalSettings((state) => state.setAutoRefetch)

    const onChange = (val) => {
        if (val >= 15 && val < 1000) {
            setRefetchInterval(val * 1000)
        }
    }

    const onDisableChange = (val) => {
        setAutoRefetch(val)
    }

    return (
        <>
            <span>Automatické aktualizace:</span>
            <br />
            <Switch checked={autoRefetch} onChange={onDisableChange} />
            {autoRefetch ?
                <>
                    <br />
                    <span>Aktualizace po: (s)</span>
                    <br />
                    <InputNumber value={refetchInterval / 1000} onChange={onChange} min={15} max={1000} />
                </>
                : null}
        </>
    )
}
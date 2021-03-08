
import { stringify } from "node:querystring"
import React, { SetStateAction, useState } from "react"
import "../styles/editor.scss"
import { CirclePicker } from 'react-color'
import DrawingPanel from "./DrawingPanel"

// tipos
interface initializeDrawingPanelProps {
    panelWidth: number
    SetpanelWidth: React.Dispatch<React.SetStateAction<number | undefined>>
    panelHeight: number
    SetpanelHeight: React.Dispatch<React.SetStateAction<number | undefined>>
    hideOptions: Boolean
    SethideOptions: React.Dispatch<React.SetStateAction<Boolean>>
    hideDrawingPanel: boolean
    SethideDrawingPanel: React.Dispatch<React.SetStateAction<Boolean>>
    butoonText: string
    SetbutoonText: React.Dispatch<React.SetStateAction<string>>
    selectedColor?: string
}

interface Color {
    hex: SetStateAction<string>
}


export default function Editor() {

    const [panelWidth, SetpanelWidth] = useState<number>(16)
    const [panelHeight, SetpanelHeight] = useState<number>(16)
    const [hideOptions, SethideOptions] = useState(false)
    const [hideDrawingPanel, SethideDrawingPanel] = useState(true)
    const [butoonText, SetbutoonText] = useState("start drawing")
    const [selectedColor, setColor] = useState('#f44336')


    function initializeDrawingPanel() {
        SethideOptions(!hideOptions)
        SethideDrawingPanel(!hideDrawingPanel)

        butoonText == "start drawing"
            ? SetbutoonText('reset')
            : SetbutoonText("start drawing")
    }

    function changeColor(color: Color) {
        setColor(color.hex)
    }

    return (
        <div id='editor'>
            <h1>Editor de Pixels</h1>
            {hideDrawingPanel && <h2> Entre com as dimensões do painel</h2>}
            {hideDrawingPanel && (

                <div id='options'>
                    <div className='option'>
                        <input
                            type="number"
                            className='panelInput'
                            defaultValue={panelWidth}
                            onChange={e => SetpanelWidth(parseInt(e.target.value))}
                        />
                        <span> Largura </span>
                    </div>
                    <div className='option'>
                        <input type="number" className='panelInput' />
                        <span> Altura </span>
                    </div>
                </div>

            )}
            <button
                onClick={initializeDrawingPanel}
                className='button'
            > {butoonText}
            </button>
            {
                hideOptions && (
                    <CirclePicker
                        color={selectedColor}
                        onChangeComplete={changeColor} />
                )
            }

            {
                hideOptions && (
                    <DrawingPanel
                        width={panelWidth}
                        height={panelWidth}
                        selectedColor={selectedColor}
                        onChangeComplete={changeColor} />
                )}
        </div>
    )
}
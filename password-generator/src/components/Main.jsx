import { useState,useRef } from 'react';
import data from '../data'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy, faRotateLeft, faCheck } from '@fortawesome/free-solid-svg-icons'

export default function Main() {
    const [info, setInfo] = useState({
        password: "",
        range: 8,
        number: false,
        symbol: false,
        copy: false
    });
    function handleChange(e) {
        const { name, value, type, checked } = e.target
        setInfo(preveData => ({
            ...preveData,
            [name]: type === "checkbox" ? checked : value
        }))
    }
    function getPass() {
        let i = info.range
        let pass = ''
        if (info.number && !info.symbol) {
            while (i != 0) {
                pass += data.numbers[Math.floor(Math.random() * data.numbers.length)]
                i--;
            }
        }
        else if (info.symbol && !info.number) {
            while (i != 0) {
                pass += data.symbols[Math.floor(Math.random() * data.symbols.length)]
                i--;
            }
        }
        else if (info.symbol && info.number) {
            while (i != 0) {
                // const randomInteger = Math.floor(Math.random() * 2);
                // randomInteger ?
                // pass += data.numbers[Math.floor(Math.random() * data.numbers.length)]
                // : pass += data.symbols[Math.floor(Math.random() * data.symbols.length)]
                pass += (data.symbols.concat(data.numbers))[Math.floor(Math.random() * (data.symbols.length + data.numbers.length))]
                i--;
            }
        }
        else {
            alert("please at least choose one option")
            return;
        }
        setInfo(preveInfo => ({
            ...preveInfo,
            password: pass,
            copy: preveInfo.copy ? !preveInfo.copy : preveInfo.copy
        }))
    }
    function copyToClipboard() {
        if (info.password) {
          navigator.clipboard.writeText(info.password)
          setInfo(preveInfo => ({
            ...preveInfo,
            copy: preveInfo.copy ? preveInfo.copy : !preveInfo.copy
          }))
        }
      }
    return (
        <main>
            <div className="input">
                <input
                    // disabled
                    type="text"
                    name="password"
                    onChange={handleChange}
                    value={info.password}
                />
                <FontAwesomeIcon
                    icon={faRotateLeft}
                    className='rotate'
                    onClick={getPass}
                />
                <FontAwesomeIcon 
                    icon={info.copy ? faCheck : faCopy}
                    className='copy'
                    onClick={copyToClipboard}
                />
            </div>
            <hr />
            <div className='label'>
                <label htmlFor="length">Length</label>
                <input
                    type="range"
                    name="range"
                    id="length"
                    onChange={handleChange}
                    min="8"
                    max="25"
                    value={info.range}
                />
                <span>{info.range}</span>
                <br />
                <label htmlFor="number">Number</label>
                <input
                    type="checkbox"
                    name="number"
                    id="number"
                    onChange={handleChange}
                    checked={info.number}
                />
                <br />
                <label htmlFor="symbol">Symbol</label>
                <input
                    type="checkbox"
                    name="symbol"
                    id="symbol"
                    onChange={handleChange}
                    checked={info.symbol}
                />
            </div>
        </main>
    )
}
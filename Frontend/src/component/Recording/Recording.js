import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Recording.css';
import FormDirection from './FormDirection';
import InHandField from './InHandField';
import InVentoryField from './InVentoryField';

export default function Recording() {
    const [records, setRecords] = useState({
        'South': { 'inHand': [], 'inventory': [[]] },
        'West': { 'inHand': [], 'inventory': [[]] },
        'North': { 'inHand': [], 'inventory': [[]] },
        'East': { 'inHand': [], 'inventory': [[]] },
    });
    const [direction, setDirection] = useState('South');

    useEffect(() => {
        getRecords();
    }, []);

    const getRecords = async () => {
        let res = await axios.get('http://localhost:4000/result');
        const allData = res.data[0]['recording'];
        setRecords(allData);
        console.log(allData)
    }

    const handleChangeDirection = (e) => {
        setDirection(e);
    }

    return (
        <>
            <FormDirection onChangeDirecion={handleChangeDirection} />
            <InHandField records={records} direction={direction}/>
            <InVentoryField records={records} direction={direction}/>
        </>
    )
}

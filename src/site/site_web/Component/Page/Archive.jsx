import { useParams } from "react-router-dom";
import React from "react";
export default function Archive(){
    const {year, month, day} = useParams();

    console.log(year)
    console.log(month)
    console.log(day)

    return (
        <>Archive</>
    );
}
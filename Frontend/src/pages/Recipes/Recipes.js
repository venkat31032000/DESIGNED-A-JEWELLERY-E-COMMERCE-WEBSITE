import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import '../../styles/recipes.css'
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import SideBar from '../../components/SideBar';
import "bootstrap/dist/css/bootstrap.min.css";
import HeaderLogo from '../../components/HeaderLogo';

function Recipes() {
    const [data, setData] = useState([]);
    const [flag, setFlag] = useState(false);
    if (flag === false) {
        const options = {
            method: 'GET',
            url: 'https://tasty.p.rapidapi.com/recipes/list',
            params: { from: '0', size: '20', tags: 'under_30_minutes' },
            headers: {
                'X-RapidAPI-Key': 'a3a97f7cacmshdd35a572fb3374fp1b6b99jsn7dfe5d94105e',
                'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
            }
        };
        axios.request(options).then(function (response) {
            setData(response.data.results);
            setFlag(true);
        }).catch(function (error) {
            console.error(error);
        });

    }

    return (
        <>
            <SideBar />
            <HeaderLogo title="Tasty Recipes" />
            <div className='recipefeed'>
                {flag === false ? <div className='loader'><Spinner animation="border" variant="dark" /></div> :
                    data !== undefined && data.length !== 0 ?
                        data.map((d) => {
                            return (
                                <>
                                    <Card className="recipes">
                                        <Card.Header>{d.name}<br /></Card.Header>
                                        <Card.Body>
                                            <Card.Text>
                                                <>
                                                    {d.recipes ?
                                                        d.recipes.map(r => {
                                                            return (
                                                                <>
                                                                    {r.name}<br />
                                                                    {r.description}
                                                                    <br />
                                                                    <img src={r.thumbnail_url} alt={r.thumbnail_alt_text} width="500px" height="300px" className='foodimg' />
                                                                    <br />
                                                                    {r.prep_time_minutes ? "Preparation time:" + r.prep_time_minutes : null}
                                                                    <br />
                                                                    {r.yields}
                                                                    <br /><br />
                                                                    {r.instructions ? "Instructions:" : null}
                                                                    <ol>
                                                                        {r.instructions?.map((i) => { return (<li style={{ color: "black", textAlign: "left" }}>{i.display_text}<br /></li>) })}
                                                                    </ol>
                                                                    {r.user_ratings ? r.user_ratings.score !== null ? "User Rating: " + (r.user_ratings.score * 100) + '%' : null : null}
                                                                </>
                                                            )
                                                        }
                                                        ) : (<>
                                                            {d.description}
                                                            <br />
                                                            <img src={d.thumbnail_url} alt={d.thumbnail_alt_text} width="500px" height="300px" className='foodimg' />
                                                            <br />
                                                            {d.prep_time_minutes ? "Preparation time:" + d.prep_time_minutes : null}
                                                            <br />
                                                            {d.yields}
                                                            <br /><br />
                                                            {d.instructions ? "Instructions:" : null}
                                                            <ol>
                                                                {d.instructions?.map((i) => { return (<li style={{ color: "black", textAlign: "left" }}>{i.display_text}<br /></li>) })}
                                                            </ol>
                                                            {d.user_ratings ? d.user_ratings.score !== null ? "User Rating: " + (d.user_ratings.score * 100) + '%' : null : null}
                                                        </>)
                                                    }</>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                    <br />
                                </>
                            )
                        })
                        : null}
            </div>

        </>
    );
}

export default Recipes;
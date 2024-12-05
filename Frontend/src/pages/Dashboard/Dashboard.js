import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Alert } from 'react-bootstrap';
import '../../styles/dashboard.css';
import SideBar from '../../components/SideBar';
import HeaderLogo from '../../components/HeaderLogo';

function Dashboard() {
    const [feed, setFeed] = useState([]);
    const [click, setClick] = useState(false);

    useEffect(() => {
        if (click === true) {
            const listdata = document.getElementById("ft").value;
            const address = document.getElementById("location").value
            const location = "http://maps.google.com/maps?q=" + encodeURIComponent(address);
            const contact = document.getElementById("ph").value;
            const list = feed;
            list.push({ info: listdata, loc: location, address: address, contact: contact });
            setFeed(list);
            setClick(false);
            document.getElementById("ft").value = '';
            document.getElementById("location").value = '';
            document.getElementById("ph").value = '';
        }
    }, [click])

    return (
        <>
            <SideBar />
            <HeaderLogo title="How is the product Please review?"/>
            <div class="container">
                <Container>
                <br/>
                    <Card>
                        <Card.Body>
                            <Card.Title>Please Review the product</Card.Title>
                            <Card.Text>
                                <div className='feed'>
                                    {feed !== null ? feed.map((f) => {
                                        return (
                                            <Alert className='feedtext'>
                                                {f.info + ' @ '}
                                                <a href={f.loc} target="_blank">{f.address}</a><br />{" Please contact on "}
                                                <a href={"https://wa.me/" + f.contact}>{"Whatsapp"}</a>
                                            </Alert>
                                        )
                                    }) : null}
                                </div>
                                <div className='send'>
                                    <input type="text" placeholder='Enter message' id='ft' />
                                    <input type="text" placeholder='Enter location' id='location' />
                                    <input type="text" placeholder='Enter Contact number' id='ph' />
                                    <button onClick={() => { setClick(true) }}>Send</button>
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        </>
    )
}

export default Dashboard
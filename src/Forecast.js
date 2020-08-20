import React from "react";
import { observer } from "mobx-react";
import { searchForecast } from "./request";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";

function Forecast({ keywordStore }) {
    const [forecast, setForecast] = React.useState({});
    const getWeatherForecast = async keyword => {
        const response = await searchForecast(keyword);
        setForecast(response.data);
    };
    React.useEffect(() => {
        keywordStore.keyword && getWeatherForecast(keywordStore.keyword);
    }, [keywordStore.keyword]);
    return (
        <div>
            {Array.isArray(forecast.list) ? (
                <div>
                    {forecast.list.map((l, index) => {
                        return (
                            <Card body key={index}>
                                <ListGroup>
                                    <ListGroup.Item>Date: {l.dt_txt}</ListGroup.Item>
                                    <ListGroup.Item>
                                        Temperature: {l.main.temp - 273.15} C
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        High: {l.main.temp_max - 273.15} C
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Low: {l.main.temp_min - 273.15} C
                                    </ListGroup.Item>
                                    <ListGroup.Item>Pressure: {l.main.pressure} C</ListGroup.Item>
                                </ListGroup>
                            </Card>
                        );
                    })}
                </div>
            ) : null}
        </div>
    );
}
export default observer(Forecast);
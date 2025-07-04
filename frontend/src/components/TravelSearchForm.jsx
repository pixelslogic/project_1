import React, { useState, useCallback } from 'react';
import { Container, Nav, Tab, Form, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Airplane, Train, Bus } from "./Search-form";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import debounce from 'lodash/debounce'; // Установите lodash: npm install lodash

const TravelSearchForm = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        },
    ]);
    const [open, setOpen] = useState(false);
    const [passengers, setPassengers] = useState('1 пассажир, эконом');
    const [activeTab, setActiveTab] = useState('flights');
    const [fromSuggestions, setFromSuggestions] = useState([]);
    const [toSuggestions, setToSuggestions] = useState([]);
    const [error, setError] = useState(null); // Состояние для ошибок

    // Кэш для хранения результатов запросов
    const suggestionCache = React.useRef({});

    const fetchAirportSuggestionsRaw = async (query) => {
        if (!query || query.length < 2) return [];

        // Проверяем кэш
        if (suggestionCache.current[query]) {
            return suggestionCache.current[query];
        }

        try {
            const response = await axios.get('https://skyscanner89.p.rapidapi.com/flights/auto-complete', {
                params: { query },
                headers: {
                    'X-RapidAPI-Key': '1543209040msh8e17b9545bafd20p1c0ae4jsn4f0827f47b4d',
                    'X-RapidAPI-Host': 'skyscanner89.p.rapidapi.com'
                }
            });
            const suggestions = response.data?.data?.map(item => ({
                city: item?.city?.name || item.presentationName || 'Unknown',
                iata: item?.iataCode || '',
                country: item?.country?.name || '',
                display: `${item?.city?.name || item.presentationName} (${item?.iataCode})`
            })) || [];
            suggestionCache.current[query] = suggestions; // Сохраняем в кэш
            setError(null); // Сбрасываем ошибку
            return suggestions;
        } catch (err) {
            console.error('Ошибка при загрузке аэропортов:', err);
            if (err.response?.status === 429) {
                setError('Слишком много запросов. Пожалуйста, подождите немного.');
            } else {
                setError('Ошибка загрузки данных. Попробуйте позже.');
            }
            return [];
        }
    };

    // Debouncing для функции fetchAirportSuggestions
    const fetchAirportSuggestions = useCallback(
        debounce((value, callback) => {
            fetchAirportSuggestionsRaw(value).then(callback);
        }, 500), // Задержка 500мс
        []
    );

    const swapButton = () => {
        setFrom(to);
        setTo(from);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Отправка формы:', { from, to, date, passengers });
    };

    return (
        <Container fluid className="travel-search-form text-white p-4">
            <div className="travel-wrapper">
                <h1>Больше, чем дорога. Это ваш путь к мечтам!</h1>
                {error && <div className="text-danger mb-3">{error}</div>}
                <Tab.Container 
                    id="travel-tabs" 
                    defaultActiveKey="flights" 
                    onSelect={(key) => setActiveTab(key)}
                >
                    <Nav variant="tabs" className="mb-3 search-nav">
                        <Nav.Item>
                            <Nav.Link eventKey="flights" className='travel-icons'>
                                <Airplane />
                                <span>Авиабилеты</span>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="trains" className='travel-icons'>
                                <Train />
                                <span>Ж/Д билеты</span>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="buses" className='travel-icons'>
                                <Bus />
                                <span>Автобусы</span>
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Tab.Content>
                        <Tab.Pane eventKey="flights">
                            <Form onSubmit={handleSubmit}>
                                <Row className="m-0 d-flex align-items-center">
                                    <Col md={3} className="p-0 w-auto">
                                        <Form.Group controlId="from">
                                            <Autosuggest
                                                suggestions={fromSuggestions}
                                                onSuggestionsFetchRequested={({ value }) => {
                                                    fetchAirportSuggestions(value, (suggestions) => {
                                                        setFromSuggestions(suggestions);
                                                    });
                                                }}
                                                onSuggestionsClearRequested={() => setFromSuggestions([])}
                                                getSuggestionValue={(suggestion) => suggestion.display}
                                                renderSuggestion={(suggestion) => <div>{suggestion.display}</div>}
                                                onSuggestionSelected={(event, { suggestion }) => setFrom(suggestion.display)}
                                                inputProps={{
                                                    placeholder: 'Откуда',
                                                    value: from,
                                                    onChange: (e, { newValue }) => setFrom(newValue || ''),
                                                    className: 'form-control rounded-start',
                                                }}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={1} className="d-flex align-items-end p-0 w-auto">
                                        <Button
                                            variant="light"
                                            className="swap-button form-control"
                                            onClick={swapButton}
                                            title="Поменять местами"
                                            style={{ borderRadius: 0 }}
                                        >
                                            <i className="bi bi-arrow-left-right"></i>
                                        </Button>
                                    </Col>
                                    <Col md={3} className="p-0 w-auto">
                                        <Form.Group controlId="to">
                                            <Autosuggest
                                                suggestions={toSuggestions}
                                                onSuggestionsFetchRequested={({ value }) => {
                                                    fetchAirportSuggestions(value, (suggestions) => {
                                                        setToSuggestions(suggestions);
                                                    });
                                                }}
                                                onSuggestionsClearRequested={() => setToSuggestions([])}
                                                getSuggestionValue={(suggestion) => suggestion.display}
                                                renderSuggestion={(suggestion) => <div>{suggestion.display}</div>}
                                                onSuggestionSelected={(event, { suggestion }) => setTo(suggestion.display)}
                                                inputProps={{
                                                    placeholder: 'Куда',
                                                    value: to,
                                                    onChange: (e, { newValue }) => setTo(newValue || ''),
                                                    className: 'form-control',
                                                }}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3} className="p-0">
                                        <div className='date-selector-wrapper'>
                                            <Form.Group controlId="date">
                                                <div className="date-input-wrapper">
                                                    <Form.Control
                                                        type="text"
                                                        readOnly
                                                        onClick={() => setOpen(!open)}
                                                        value={`${format(date[0].startDate, 'dd/MM/yyyy')} до ${format(date[0].endDate, 'dd/MM/yyyy')}`}
                                                        placeholder="Выберите даты"
                                                        className="date-selector-input"
                                                    />
                                                    <FontAwesomeIcon icon={faCalendarDays} className='travelSearchIcon' />
                                                </div>
                                            </Form.Group>
                                            {open && (
                                                <div className="date-selector-popup">
                                                    <DateRange
                                                        editableDateInputs={true}
                                                        onChange={(item) => setDate([item.selection])}
                                                        moveRangeOnFirstSelection={false}
                                                        ranges={date}
                                                        className='date-selector-calendar'
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </Col>
                                    <Col md={2} className="p-0 w-auto">
                                        <Form.Group controlId="passengers">
                                            <Form.Control
                                                type="text"
                                                value={passengers}
                                                onChange={(e) => setPassengers(e.target.value)}
                                                placeholder="1 пассажир, эконом"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={2} className="d-flex align-items-end p-0 w-auto">
                                        <Button
                                            variant="dark"
                                            className="w-100 rounded-end"
                                            type="submit"
                                            style={{ borderRadius: 0 }}
                                        >
                                            Найти билеты
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </div>
        </Container>
    );
};

export default TravelSearchForm;
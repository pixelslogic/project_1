import React, { useState, useCallback } from 'react';
import { Container, Nav, Tab, Form, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Airplane, Train, Bus } from './SearchFormIcons';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import debounce from 'lodash/debounce';

const trainStations = [
    { city: 'Москва', code: 'MOS', country: 'Россия', display: 'Москва (MOS)' },
    { city: 'Санкт-Петербург', code: 'SPB', country: 'Россия', display: 'Санкт-Петербург (SPB)' },
    { city: 'Екатеринбург', code: 'EKB', country: 'Россия', display: 'Екатеринбург (EKB)' },
    { city: 'Казань', code: 'KZN', country: 'Россия', display: 'Казань (KZN)' }
];

const busStations = [
    { city: 'Москва', code: 'MOS-BUS', country: 'Россия', display: 'Москва (MOS-BUS)' },
    { city: 'Санкт-Петербург', code: 'SPB-BUS', country: 'Россия', display: 'Санкт-Петербург (SPB-BUS)' },
    { city: 'Нижний Новгород', code: 'NNG-BUS', country: 'Россия', display: 'Нижний Новгород (NNG-BUS)' },
    { city: 'Воронеж', code: 'VOR-BUS', country: 'Россия', display: 'Воронеж (VOR-BUS)' }
];

const SearchForm = ({ from, setFrom, to, setTo, date, setDate, open, setOpen, passengers, setPassengers, fromSuggestions, setFromSuggestions, toSuggestions, setToSuggestions, fetchSuggestions, setError, suggestionCache, activeTab }) => {
    const swapButton = () => {
        setFrom(to);
        setTo(from);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Отправка формы:', { from, to, date, passengers, activeTab });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Row className="m-0 d-flex align-items-center">
                <Col md={3} className="p-0 w-auto">
                    <Form.Group controlId="from">
                        <Autosuggest
                            suggestions={fromSuggestions}
                            onSuggestionsFetchRequested={({ value }) => {
                                fetchSuggestions(value, activeTab, (suggestions) => {
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
                                fetchSuggestions(value, activeTab, (suggestions) => {
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
                        Найти {activeTab === 'flights' ? 'авиабилеты' : activeTab === 'trains' ? 'ж/д билеты' : 'автобусные билеты'}
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

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
    const [error, setError] = useState(null);

    const suggestionCache = React.useRef({});

    const fetchSuggestionsRaw = async (query, tab) => {
        if (!query || query.length < 2) return [];

        if (suggestionCache.current[`${tab}_${query}`]) {
            return suggestionCache.current[`${tab}_${query}`];
        }

        try {
            if (tab === 'flights') {
                // API для аэропортов (Skyscanner)
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
                suggestionCache.current[`${tab}_${query}`] = suggestions;
                setError(null);
                return suggestions;
            } else if (tab === 'trains') {
                // Локальные данные для ж/д вокзалов
                const suggestions = trainStations.filter(station =>
                    station.city.toLowerCase().includes(query.toLowerCase())
                );
                suggestionCache.current[`${tab}_${query}`] = suggestions;
                setError(null);
                return suggestions;
            } else {
                // Локальные данные для автобусных станций
                const suggestions = busStations.filter(station =>
                    station.city.toLowerCase().includes(query.toLowerCase())
                );
                suggestionCache.current[`${tab}_${query}`] = suggestions;
                setError(null);
                return suggestions;
            }
        } catch (err) {
            console.error(`Ошибка при загрузке данных для ${tab}:`, err);
            if (err.response?.status === 429) {
                setError('Слишком много запросов. Пожалуйста, подождите немного.');
            } else {
                setError('Ошибка загрузки данных. Попробуйте позже.');
            }
            return [];
        }
    };

    const fetchSuggestions = useCallback(
        debounce((value, tab, callback) => {
            fetchSuggestionsRaw(value, tab).then(callback);
        }, 500),
        []
    );

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
                            <SearchForm 
                                from={from}
                                setFrom={setFrom}
                                to={to}
                                setTo={setTo}
                                date={date}
                                setDate={setDate}
                                open={open}
                                setOpen={setOpen}
                                passengers={passengers}
                                setPassengers={setPassengers}
                                fromSuggestions={fromSuggestions}
                                setFromSuggestions={setFromSuggestions}
                                toSuggestions={toSuggestions}
                                setToSuggestions={setToSuggestions}
                                fetchSuggestions={fetchSuggestions}
                                setError={setError}
                                suggestionCache={suggestionCache}
                                activeTab={activeTab}
                            />
                        </Tab.Pane>
                        <Tab.Pane eventKey="trains">
                            <SearchForm 
                                from={from}
                                setFrom={setFrom}
                                to={to}
                                setTo={setTo}
                                date={date}
                                setDate={setDate}
                                open={open}
                                setOpen={setOpen}
                                passengers={passengers}
                                setPassengers={setPassengers}
                                fromSuggestions={fromSuggestions}
                                setFromSuggestions={setFromSuggestions}
                                toSuggestions={toSuggestions}
                                setToSuggestions={setToSuggestions}
                                fetchSuggestions={fetchSuggestions}
                                setError={setError}
                                suggestionCache={suggestionCache}
                                activeTab={activeTab}
                            />
                        </Tab.Pane>
                        <Tab.Pane eventKey="buses">
                            <SearchForm 
                                from={from}
                                setFrom={setFrom}
                                to={to}
                                setTo={setTo}
                                date={date}
                                setDate={setDate}
                                open={open}
                                setOpen={setOpen}
                                passengers={passengers}
                                setPassengers={setPassengers}
                                fromSuggestions={fromSuggestions}
                                setFromSuggestions={setFromSuggestions}
                                toSuggestions={toSuggestions}
                                setToSuggestions={setToSuggestions}
                                fetchSuggestions={fetchSuggestions}
                                setError={setError}
                                suggestionCache={suggestionCache}
                                activeTab={activeTab}
                            />
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </div>
        </Container>
    );
};

export default TravelSearchForm;
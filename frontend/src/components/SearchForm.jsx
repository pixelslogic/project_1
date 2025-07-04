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
                        Найти {activeTab === 'flights' ? 'билеты' : activeTab === 'trains' ? 'ж/д билеты' : 'автобусные билеты'}
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};
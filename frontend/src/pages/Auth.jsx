import React from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";
import { NavLink, useLocation } from "react-router-dom";

const Auth = ({ show, handleClose }) => { // Принимаем show и handleClose как пропсы
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE;

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Body>
                <Card style={{ width: "100%" }} className="p-5">
                    <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
                    <Form className="d-flex flex-column">
                        <Form.Control className="mt-3" placeholder="Введите ваш email" />
                        <Form.Control className="mt-3" placeholder="Введите ваш пароль" />
                        <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                            {isLogin ? (
                                <div className="d-flex gap-1">
                                    Нет аккаунта?{" "}
                                    <NavLink to={REGISTRATION_ROUTE} className="auth-registration">
                                        Зарегистрируйся!
                                    </NavLink>
                                </div>
                            ) : (
                                <div>
                                    Есть аккаунт?{" "}
                                    <NavLink to={LOGIN_ROUTE} className="auth-registration">
                                        Войти!
                                    </NavLink>
                                </div>
                            )}
                            <Button
                                className="mt-3 align-self-end"
                                variant="outline-success"
                                onClick={handleClose}
                            >
                                {isLogin ? "Войти" : "Регистрация"}
                            </Button>
                        </Row>
                    </Form>
                </Card>
            </Modal.Body>
        </Modal>
    );
};

export default Auth;
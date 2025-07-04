import {makeAutoObservable} from 'mobx';

export default class UserBooking{
    constructor() {
        this._types = [
            {id: 1}
        ]
        this._isAuth = false
        this._user = {}
        makeAutoObservable(this)
    }
    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }
    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }
}
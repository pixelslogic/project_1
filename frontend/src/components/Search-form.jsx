import AirplaneIcon from "../source/svg/airplane-icon.svg?react";
import TrainIcon from "../source/svg/train-icon.svg?react";
import BusIcon from "../source/svg/bus-icon.svg?react";

const Airplane = () => {
    return <AirplaneIcon width="60" height="60" className="transport-icon" />;
};

const Train = () => {
    return <TrainIcon width="60" height="60" className="transport-icon" />;
};

const Bus = () => {
    return <BusIcon width="60" height="60" className="transport-icon" />;
};

export { Airplane, Train, Bus };

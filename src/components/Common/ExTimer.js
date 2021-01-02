import React from 'react';
// import PropTypes from "prop-types"
// ExTimer.propTypes = {
//     initSeconds: PropTypes.number
// };
//
//
// function ExTimer(props) {
//     const {initSeconds} = props;
//     const [time, setTime] = useState({});
//     const [seconds, setSeconds] = useState(initSeconds);
//     let timer = useRef(0);
//     useEffect(() => {
//         let timeLeftVar = secondsToTime(seconds);
//         setTime(timeLeftVar);
//         if (timer.current === 0 && seconds > 0) {
//             timer.current = setInterval(countDown, 1000);
//         }
//     }, []);
//
//     const secondsToTime = useCallback((secs) => {
//         let hours = Math.floor(secs / (60 * 60));
//
//         let divisor_for_minutes = secs % (60 * 60);
//         let minutes = Math.floor(divisor_for_minutes / 60);
//
//         let divisor_for_seconds = divisor_for_minutes % 60;
//         let tempSeconds = Math.ceil(divisor_for_seconds);
//
//         let obj = {
//             "h": hours,
//             "m": minutes,
//             "s": tempSeconds
//         };
//         return obj;
//     }, []);
//
//
//     const countDown = useCallback(() => {
//         // Remove one second, set state so a re-render happens.
//         let tempSeconds = seconds - 1;
//         setTime(() => secondsToTime(tempSeconds));
//         setSeconds(()=>tempSeconds);
//         // Check if we're at zero.
//         if (tempSeconds === 0) {
//             clearInterval(timer.current);
//         }
//     }, [seconds, timer]);
//
//     return (
//         <div>
//             {time.m} : {time.s}
//         </div>
//     );
// }
//
// export default ExTimer;

export default class ExTimer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {timeEnd: false, time: {}, seconds: props.initSeconds};
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }

    secondsToTime(secs) {
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return obj;
    }

    componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({time: timeLeftVar});
        this.startTimer()
    }

    startTimer() {
        if (this.timer == 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown() {
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });

        // Check if we're at zero.
        if (seconds == 0) {
            clearInterval(this.timer);
            this.setState({
                timeEnd: true
            });
            this.props.handleEndTime();
        }
    }

    render() {
        return (
            <div>
                {this.state.timeEnd ? "کد را دوباره ارسال نمایید" : this.state.time.m + " : " + this.state.time.s}
            </div>
        );
    }
}
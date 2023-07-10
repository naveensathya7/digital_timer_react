// Write your code here
import {Component} from 'react'

import './index.css'

const initialState = {
  isTimerRunning: false,
  timeElapsedInSeconds: 0,
  timerLimitInMinutes: 25,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecreaseTimerInMinutes = () => {
    const {timerLimitInMinutes} = this.state

    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onIncreaseTimerInMinutes = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  incrementTimeElapsedInSeconds = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {
      isTimerRunning,
      timeElapsedInSeconds,
      timerLimitInMinutes,
    } = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - timeElapsedInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {
      timerLimitInMinutes,
      timeElapsedInSeconds,
      isTimerRunning,
    } = this.state
    const isButtonsDisabled = timeElapsedInSeconds > 0

    const startOrPauseImageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'
    const labelText = isTimerRunning ? 'Running' : 'Paused'
    return (
      <div className="bg-container">
        <h1>Digital Timer</h1>
        <div className="content-container">
          <div className="timer-container">
            <div className="counter-bg">
              <h1 className="countdown-timer">
                {this.getElapsedSecondsInTimeFormat()}
              </h1>
              <p className="counter-status">{labelText}</p>
            </div>
          </div>
          <div className="buttons-section">
            <div className="start-reset-buttons">
              <div className="buttons">
                <button
                  className="img-btn"
                  type="button"
                  onClick={this.onStartOrPauseTimer}
                >
                  <img
                    className="img"
                    alt={startOrPauseAltText}
                    src={startOrPauseImageUrl}
                  />
                  <p>{isTimerRunning ? 'Pause' : 'Start'}</p>
                </button>
              </div>
              <div className="buttons">
                <button
                  className="img-btn"
                  type="button"
                  onClick={this.onResetTimer}
                >
                  <img
                    className="img"
                    alt="reset icon"
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  />
                  <p>Reset</p>
                </button>
              </div>
            </div>
            <p>Set Timer Limit</p>
            <div className="timer-set">
              <button
                className="inc-dec-btn"
                type="button"
                disabled={isButtonsDisabled}
                onClick={this.onDecreaseTimerInMinutes}
              >
                <p>-</p>
              </button>
              <p className="set-timer">{timerLimitInMinutes}</p>
              <button
                className="inc-dec-btn"
                type="button"
                disabled={isButtonsDisabled}
                onClick={this.onIncreaseTimerInMinutes}
              >
                <p>+</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer

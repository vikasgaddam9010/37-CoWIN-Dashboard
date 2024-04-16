import './index.css'
import {Component} from 'react'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'
import Loader from 'react-loader-spinner'

const stateStatus = {
  loader: 'LOADER',
  success: 'success',
  failure: 'failure',
}
class CowinDashboard extends Component {
  state = {
    apiStatus: stateStatus.loader,
    lastDaysVaccinationList: [],
    vaccinationByAgeList: [],
    vaccinationByGenderList: [],
  }
  componentDidMount() {
    this.getCovidData()
  }
  getCovidData = async () => {
    this.setState({apiStatus: stateStatus.loader})
    const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const data = await fetch(vaccinationDataApiUrl)
    if (data.ok === true) {
      const stringfiedCovidData = await data.json()
      const camelCaseCovidData = {
        lastDaysVaccination: stringfiedCovidData.last_7_days_vaccination,
        vaccinationByAge: stringfiedCovidData.vaccination_by_age,
        vaccinationByGender: stringfiedCovidData.vaccination_by_gender,
      }

      const daysList = camelCaseCovidData.lastDaysVaccination.map(eachDay => ({
        vaccineDate: eachDay.vaccine_date,
        dose1: eachDay.dose_1,
        dose2: eachDay.dose_2,
      }))
      this.setState({
        apiStatus: stateStatus.success,
        lastDaysVaccinationList: daysList,
        vaccinationByAgeList: camelCaseCovidData.vaccinationByAge,
        vaccinationByGenderList: camelCaseCovidData.vaccinationByGender,
      })
    } else {
      this.setState({apiStatus: stateStatus.failure})
    }
  }
  renderLoaderView = () => {
    return (
      <div data-testid="loader" className="d-flex justify-content-center">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    )
  }

  renderSuccessView = () => {
    const {
      lastDaysVaccinationList,
      vaccinationByAgeList,
      vaccinationByGenderList,
    } = this.state
    return (
      <>
        <div className="vaccination-coverage-container">
          <h1 className="text-6c757d">Vaccination Coverage</h1>
          <VaccinationCoverage
            lastDaysVaccinationList={lastDaysVaccinationList}
          />
        </div>
        <div className="vaccination-coverage-container">
          <h1 className="text-6c757d">Vaccination by gender</h1>
          <VaccinationByGender
            vaccinationByGenderList={vaccinationByGenderList}
          />
        </div>
        <div className="vaccination-coverage-container">
          <h1 className="text-6c757d">Vaccination by Age</h1>
          <div>
            <VaccinationByAge vaccinationByAgeList={vaccinationByAgeList} />
          </div>
        </div>
      </>
    )
  }
  renderFailureView = () => {
    return (
      <>
        <div className="column">
          <img
            className="failure-img"
            alt="failure view"
            src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
          />
          <h1 className="color-ffffff">Something Went Wrong</h1>
        </div>
      </>
    )
  }
  getSuccessOrFailedView = () => {
    switch (this.state.apiStatus) {
      case stateStatus.loader:
        return this.renderLoaderView()
      case stateStatus.success:
        return this.renderSuccessView()
      case stateStatus.failure:
        return this.renderFailureView()
    }
  }
  render() {
    return (
      <div className="bg-container">
        <div className="d-flex">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="site-logo"
          />
          <p className="site-name">Co-WIN</p>
        </div>
        <h1 className="text-light">CoWIN Vaccination in India</h1>
        <div>{this.getSuccessOrFailedView()}</div>
      </div>
    )
  }
}
export default CowinDashboard

import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

import './index.css'

const teamMatchesApiUrl = 'https://apis.ccbp.in/ipl/'

class TeamMatches extends Component {
  state = {
    isLoading: true,
    recentMatchesData: {},
  }

  componentDidMount() {
    this.getRecentMatches()
  }

  getRecentMatches = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`${teamMatchesApiUrl}${id}`)
    const fetchedData = await response.json()

    // console.log(fetchedData)
    const UpdatedData = {
      teamBannerUrl: fetchedData.team_banner_url,
      latestMatch: {
        umpires: fetchedData.latest_match_details.umpires,
        result: fetchedData.latest_match_details.result,
        manOfTheMatch: fetchedData.latest_match_details.man_of_the_match,
        id: fetchedData.latest_match_details.id,
        date: fetchedData.latest_match_details.date,
        venue: fetchedData.latest_match_details.venue,
        competingTeam: fetchedData.latest_match_details.competing_team,
        competingTeamLogo: fetchedData.latest_match_details.competing_team_logo,
        firstInnings: fetchedData.latest_match_details.first_innings,
        secondInnings: fetchedData.latest_match_details.second_innings,
        matchStatus: fetchedData.latest_match_details.match_status,
      },
      recentMatches: fetchedData.recent_matches.map(recentMatch => ({
        umpires: recentMatch.umpires,
        result: recentMatch.result,
        manOfTheMacth: recentMatch.man_of_the_match,
        id: recentMatch.id,
        date: recentMatch.date,
        venue: recentMatch.venue,
        competingTeam: recentMatch.competing_team,
        competingTeamLogo: recentMatch.competing_team_logo,
        firstInnings: recentMatch.first_innings,
        secondInnings: recentMatch.second_innings,
        matchStatus: recentMatch.match_status,
      })),
    }

    console.log(UpdatedData)
    this.setState({recentMatchesData: UpdatedData, isLoading: false})
  }

  renderRecentMatchesList = () => {
    const {recentMatchesData} = this.state
    const {recentMatches} = recentMatchesData

    return (
      <ul className="recent-matches-list">
        {recentMatches.map(eachMatchData => (
          <MatchCard matchData={eachMatchData} key={eachMatchData.id} />
        ))}
      </ul>
    )
  }

  renderTeamMatches = () => {
    const {recentMatchesData} = this.state
    const {teamBannerUrl, latestMatch} = recentMatchesData

    return (
      <div className="team-matches-container">
        <img src={teamBannerUrl} className="team-banner" alt="team banner" />
        <LatestMatch latestMatchData={latestMatch} />
        {this.renderRecentMatchesList()}
      </div>
    )
  }

  getTeamClassName = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    return id.toLowerCase()
  }

  render() {
    const {isLoading} = this.state
    const className = `team-matches-route-container ${this.getTeamClassName()}`
    return (
      <div className={className}>
        {isLoading ? (
          <div testid="loader" className="loader-container">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          this.renderTeamMatches()
        )}
      </div>
    )
  }
}

export default TeamMatches

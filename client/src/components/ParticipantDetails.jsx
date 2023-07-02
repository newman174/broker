import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";
import en from "javascript-time-ago/locale/en";
// import PropTypes from "prop-types";

TimeAgo.addDefaultLocale(en);

const ParticipantDetails = ({ participantDetails }) => {
  const {
    participantType,
    versions,
    branches,
    // environments,
    publishedDate,
  } = participantDetails;

  return (
    <dl className="participant-details">
      <dt>{participantType} Versions</dt>
      <dd>{versions}</dd>
      <dt>Branches</dt>
      <dd>{branches || "(none)"}</dd>
      {/* <dt>Environments</dt> */}
      {/* <dd>{environments}</dd> */}
      <dt>Published</dt>
      <dd>
        <ReactTimeAgo date={publishedDate} />
      </dd>
    </dl>
  );
};

// ParticipantDetails.propTypes = {
//   participantDetails: PropTypes.shape({
//     participantType: PropTypes.string.isRequired,
//     versions: PropTypes.string.isRequired,
//     branches: PropTypes.string.isRequired,
//     // environments: PropTypes.string.isRequired,
//     publishedDate: PropTypes.string.isRequired,
//   }).isRequired,
// };

export default ParticipantDetails;

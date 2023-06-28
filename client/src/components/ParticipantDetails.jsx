import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);

const ParticipantDetails = ({ participantDetails }) => {
  const { participantType, version, branch, environments, publishedDate } =
    participantDetails;

  return (
    <dl className="participant-details">
      <dt>{participantType} Versions</dt>
      <dd>{version}</dd>
      <dt>Branches</dt>
      <dd>{branch}</dd>
      <dt>Environments</dt>
      <dd>{environments}</dd>
      <dt>Published Date</dt>
      <dd>
        <ReactTimeAgo date={publishedDate} />
      </dd>
    </dl>
  );
};

export default ParticipantDetails;

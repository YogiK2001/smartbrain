import './Rank.css';

const Rank = ({ user }) => {
const {name,  entries } = user;
console.log(user);

  return (
    <div>
      <div className="hero white f3 center">
        <p>{`${name}, Your Current Rank is...`}</p>
      </div>
      <div className="hero-num white f1 center p0">
        <p>{`${entries.entries || 0}`}</p>
      </div>
    </div>
  );
};

export default Rank;

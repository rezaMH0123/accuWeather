const Weekday = (props) => {
  const { iconSrc, date, singleDayClick } = props;
  return (
    <div onClick={singleDayClick} className="cursor-pointer">
      <span className="pl-2">{date}</span>
      <img className="w-12 h-12" src={iconSrc} />
    </div>
  );
};

export default Weekday;

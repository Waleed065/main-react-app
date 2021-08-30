import { abbreviateNumber } from "../../utils";

interface schema {
  barNumber: number;
  totalReviews: number;
  recievedReviews: number;
}
export default function ReviewBar({
  barNumber,
  totalReviews,
  recievedReviews,
}: schema): JSX.Element {
  const barWidth: string =
    recievedReviews && recievedReviews <= totalReviews
      ? `${(recievedReviews / totalReviews) * 100}%`
      : "0px";

  return (
    <span className={"review-single-bar"}>
      <span className={"normalFont"}>{barNumber} Stars</span>
      <span className={"review-bar-background"}>
        <span
          className={"review-bar-progress"}
          style={{
            width: barWidth,
          }}
        />
      </span>
      <span className={"normalFont review-votes"}>{`(${abbreviateNumber(
        recievedReviews
      )})`}</span>
    </span>
  );
}

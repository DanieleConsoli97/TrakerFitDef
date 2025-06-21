
import { Card, CardBody } from "@heroui/react";

const cardData = [
  { id: 1, title: "Card 1", content: "Content for Card 1" },
  { id: 2, title: "Card 2", content: "Content for Card 2" },
  { id: 3, title: "Card 3", content: "Content for Card 3" },
  { id: 4, title: "Card 4", content: "Content for Card 4" },
  { id: 5, title: "Card 5", content: "Content for Card 5" },
  { id: 6, title: "Card 6", content: "Content for Card 6" },
  { id: 7, title: "Card 7", content: "Content for Card 7" },
  { id: 8, title: "Card 8", content: "Content for Card 8" },
  { id: 9, title: "Card 9", content: "Content for Card 9" },
  { id: 10, title: "Card 10", content: "Content for Card 10" },
];

export default  function  CardSessions  () {
  return (
    <div className="space-y-4">
      {cardData.map((card) => (
        <Card key={card.id} className="w-full">
          <CardBody>
            <h3 className="text-lg font-semibold">{card.title}</h3>
            <p>{card.content}</p>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};
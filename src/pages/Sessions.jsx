import { Card, CardBody, CardHeader, Progress } from "@heroui/react";
import { Icon } from "@iconify/react";

export const Sessions = () => {
    return (
        <Card>
            <CardHeader>
                <h2 className="text-xl font-semibold">Statistiche Allenamento</h2>
            </CardHeader>
            <CardBody className="space-y-4">
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Sessioni Completate</span>
                        <span className="text-sm font-bold">8/10</span>
                    </div>
                    <Progress value={80} color="success" />
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Icon icon="lucide:flame" className="text-danger mr-2" />
                        <span>Calorie Bruciate</span>
                    </div>
                    <span className="font-bold">2,500 kcal</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Icon icon="lucide:clock" className="text-primary mr-2" />
                        <span>Tempo Totale</span>
                    </div>
                    <span className="font-bold">12h 30m</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Icon icon="lucide:dumbbell" className="text-secondary mr-2" />
                        <span>Tipo Più Frequente</span>
                    </div>
                    <span className="font-bold">Allenamento Gambe</span>
                </div>
            </CardBody>
        </Card>
    );
};
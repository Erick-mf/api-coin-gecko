import { Component, Input } from "@angular/core";
import { Chart } from "chart.js/auto";

@Component({
    selector: "app-graphic",
    standalone: true,
    imports: [],
    templateUrl: "./graphic.component.html",
})
export class GraphicComponent {
    @Input() chartData: any;
    public chart: Chart | undefined;

    ngOnInit() {
        const data = {
            labels: ["1 año", "200 dias", "60 dias", "30 dias", "14 dias", "7 dias", "24 horas", "1 hora"],
            datasets: [
                {
                    label: "Porcentaje de cambio",
                    data: this.chartData,
                    fill: false,
                    borderColor: "rgb(75, 192, 192)",
                    tension: 0.1,
                },
            ],
        };

        this.chart = new Chart("chart", {
            type: "line",
            data: data,
        });
    }
}

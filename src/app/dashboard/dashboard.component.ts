import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';
import { forkJoin } from 'rxjs';

import { MemberService } from 'src/Services/member.service';
import { PublicationService } from 'src/Services/publication.service';
import { EvenementService } from 'src/Services/evenement.service';
import { OutilService } from 'src/Services/outil.service';
import { Member } from 'src/Modèles/Member';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // ======= COUNTERS =======
  nb_Members = 0;
  nb_Articles = 0;
  nb_Events = 0;
  nb_Tools = 0;

  // ======= CHART 1 : articles par membre =======
  chartData: ChartDataset[] = [
    {
      label: 'Articles par membre',
      data: [],
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }
  ];
  chartLabels: string[] = [];

  // ======= CHART 2 : répartition membres =======
  chartData1: ChartDataset[] = [
    {
      label: 'Répartition',
      data: [],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(75, 192, 192, 0.5)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(75, 192, 192, 1)'
      ],
      borderWidth: 1
    }
  ];
  chartLabels1: string[] = ['Enseignants', 'Étudiants'];

  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  constructor(
    private MS: MemberService,
    private AS: PublicationService,
    private ES: EvenementService,
    private OS: OutilService
  ) {}

  ngOnInit(): void {
    this.loadCounters();
    this.loadCharts();
  }

  // ======= OBJECTIF 1 : Compter les éléments =======
  loadCounters(): void {
    this.MS.GetAllMembers().subscribe(res => {
      this.nb_Members = res.length;
    });
    
    this.AS.getAll().subscribe(res => {
      this.nb_Articles = res.length;
    });
    
    this.ES.GetAllEvts().subscribe(res => {
      this.nb_Events = res.length;
    });
    
    this.OS.getAll().subscribe(res => {
      this.nb_Tools = res.length;
    });
  }

  // ======= OBJECTIF 2 : Charger les graphiques =======
  loadCharts(): void {
    // ✅ Utiliser forkJoin pour charger membres et publications simultanément
    forkJoin({
      membres: this.MS.GetAllMembers(),
      publications: this.AS.getAll()
    }).subscribe(({ membres, publications }) => {
      
      // ---- Graphique 1 : Publications par membre
      this.chartLabels = [];
      const publicationsCounts: number[] = [];

      membres.forEach((membre: Member) => {
        // ✅ Utiliser nom et prenom
        this.chartLabels.push(`${membre.nom} ${membre.prenom}`);
        
        // ✅ Compter les publications de ce membre
        const count = publications.filter(pub => pub.membreId === membre.id).length;
        publicationsCounts.push(count);
      });

      this.chartData = [
        {
          label: 'Publications par membre',
          data: publicationsCounts,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }
      ];

      // ---- Graphique 2 : Répartition Enseignants/Étudiants
      // ✅ Spring Boot n'a pas de champ "type" directement
      // On doit détecter si c'est un étudiant (a dateInscription) ou enseignant (a grade)
      let nbEnseignants = 0;
      let nbEtudiants = 0;

      membres.forEach((m: any) => {
        // Si le membre a "grade" ou "etablissement", c'est un enseignant
        if (m.grade || m.etablissement) {
          nbEnseignants++;
        }
        // Si le membre a "dateInscription" ou "diplome", c'est un étudiant
        else if (m.dateInscription || m.diplome) {
          nbEtudiants++;
        }
      });

      this.chartData1 = [
        {
          label: 'Répartition des membres',
          data: [nbEnseignants, nbEtudiants],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(75, 192, 192, 0.5)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }
      ];
    });
  }
}
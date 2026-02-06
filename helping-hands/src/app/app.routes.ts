import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Mission } from './pages/mission/mission';
import { ProgramSummary } from './pages/program-summary/program-summary';
import { MedicalMissions } from './pages/medical-missions/medical-missions';
import { Sponsorships } from './pages/sponsorships/sponsorships';
import { WaysToHelp } from './pages/ways-to-help/ways-to-help';
import { OurFamily } from './pages/our-family/our-family';
import { OurTeam } from './pages/our-team/our-team';
import { Contact } from './pages/contact/contact';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'mission', component: Mission },
  { path: 'program-summary', component: ProgramSummary },
  { path: 'medical-missions', component: MedicalMissions },
  { path: 'sponsorships', component: Sponsorships },
  { path: 'ways-you-can-help', component: WaysToHelp },
  { path: 'family', component: OurFamily },
  { path: 'our-team', component: OurTeam },
  { path: 'contact', component: Contact },
  { path: '**', redirectTo: '' }
];

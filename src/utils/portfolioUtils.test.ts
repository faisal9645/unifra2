import test from 'node:test';
import assert from 'node:assert/strict';
import {
  groupProjectsByStatus,
  filterProjectsByStatus,
  isFlagshipMysaProject,
  validateVillaAccessInput
} from './portfolioUtils';
import type { ProjectItem } from '../types';

const SAMPLE_PROJECTS: ProjectItem[] = [
  {
    id: 'mysa-villas',
    name: 'MYSA Luxe Villas',
    tagline: 'Flagship',
    location: 'Vettuvankeni, ECR',
    type: 'Villas',
    units: '6 Units',
    carpetArea: '4,450 Sq.Ft.',
    status: 'Under Construction',
    statusBadge: 'Ongoing',
    imageUrl: '/images/mysa3d/02A.jpg',
    description: 'Flagship villas',
    highlights: [],
    specs: { bedrooms: '4 BHK', bathrooms: '5', levels: 'G+2', parking: '3' }
  },
  {
    id: 'orchid-gardens',
    name: 'Unifra Crest',
    tagline: 'Upcoming',
    location: 'Kotturpuram',
    type: 'Penthouses',
    units: '8 Units',
    carpetArea: '5,100 Sq.Ft.',
    status: 'Upcoming',
    statusBadge: 'Upcoming',
    imageUrl: '/images/mysa3d/KITCHEN.jpg',
    description: 'Upcoming residences',
    highlights: [],
    specs: { bedrooms: '5 BHK', bathrooms: '5', levels: 'G+2', parking: '3' }
  },
  {
    id: 'unifra-aurelia',
    name: 'Unifra Sereno',
    tagline: 'Completed',
    location: 'Palavakkam',
    type: 'Community',
    units: '8 Units',
    carpetArea: '4,800 Sq.Ft.',
    status: 'Ready to Move',
    statusBadge: 'Completed',
    imageUrl: '/images/mysa3d/mysa-day.jpg',
    description: 'Ready community',
    highlights: [],
    specs: { bedrooms: '4 BHK', bathrooms: '4.5', levels: 'G+2', parking: '2' }
  }
];

test('groupProjectsByStatus groups in Ongoing -> Upcoming -> Completed order', () => {
  const grouped = groupProjectsByStatus(SAMPLE_PROJECTS);
  assert.deepEqual(
    grouped.map((g) => g.status),
    ['Ongoing', 'Upcoming', 'Completed']
  );
  assert.equal(grouped[0].projects[0].id, 'mysa-villas');
});

test('filterProjectsByStatus returns all or matching status', () => {
  assert.equal(filterProjectsByStatus(SAMPLE_PROJECTS, 'All').length, 3);
  const ready = filterProjectsByStatus(SAMPLE_PROJECTS, 'Ready to Move');
  assert.equal(ready.length, 1);
  assert.equal(ready[0].id, 'unifra-aurelia');
});

test('isFlagshipMysaProject identifies MYSA project IDs', () => {
  assert.equal(isFlagshipMysaProject({ id: 'mysa-villas' }), true);
  assert.equal(isFlagshipMysaProject({ id: 'mysa' }), true);
  assert.equal(isFlagshipMysaProject({ id: 'orchid-gardens' }), false);
});

test('validateVillaAccessInput validates phone length and email format', () => {
  assert.equal(validateVillaAccessInput('12345', 'a@b.com').valid, false);
  assert.equal(validateVillaAccessInput('+91 98400 12345', 'invalid-email').valid, false);
  assert.equal(validateVillaAccessInput('+91 98400 12345', 'client@unifra.in').valid, true);
});

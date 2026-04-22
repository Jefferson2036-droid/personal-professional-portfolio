'use client';

import React from 'react';

const spine = [
  {
    course: 'IS117',
    year: 'Year 1',
    title: 'Web Development and Inquiry',
    stage: 'Foundation',
    status: 'approved',
    outcome: 'Make work visible through the web while learning to ask good questions of AI, stakeholders, data, and self.',
  },
  {
    course: 'IS218',
    year: 'Year 2',
    title: 'Application Delivery and Integration',
    stage: 'Build',
    status: 'proposed',
    outcome: 'Move from pages to running applications: user flows, logic, APIs, and integration under real constraints.',
  },
  {
    course: 'IS265',
    year: 'Year 2',
    title: 'Systems, Organizations, and AI Context',
    stage: 'Foundation',
    status: 'proposed',
    outcome: 'Read institutions, workflows, actors, and constraints — the human systems AI lives inside.',
  },
  {
    course: 'IS331',
    year: 'Year 3',
    title: 'Data Models and Retrieval Architecture',
    stage: 'Build',
    status: 'proposed',
    outcome: 'Design the data models, schemas, and retrieval structures enterprise AI systems depend on.',
  },
  {
    course: 'IS390',
    year: 'Year 3',
    title: 'Specification, Evaluation, and Human-in-the-Loop Design',
    stage: 'Translate',
    status: 'proposed',
    outcome: 'Translate ambiguity into specs, acceptance criteria, evaluation harnesses, and human oversight.',
  },
  {
    course: 'IS425',
    year: 'Year 4',
    title: 'Enterprise AI Infrastructure',
    stage: 'Deploy',
    status: 'approved',
    outcome: 'Bring the stack together: deployment patterns, infrastructure, governance, capstone readiness.',
  },
  {
    course: 'IS465',
    year: 'Year 4',
    title: 'Analytics, Instrumentation, and Value Measurement',
    stage: 'Translate',
    status: 'proposed',
    outcome: 'Connect data work to performance, instrumentation, and measurable enterprise value.',
  },
  {
    course: 'IS480',
    year: 'Year 4',
    title: 'Data-Centric AI and Evaluation',
    stage: 'Apply',
    status: 'approved',
    outcome: 'Work directly with model behavior, data quality, and evaluation-oriented AI systems practice.',
  },
] as const;

const stageColors: Record<(typeof spine)[number]['stage'], string> = {
  Foundation: '#ebdcc2',
  Build: '#bfe1df',
  Translate: '#f3c388',
  Apply: '#eb9267',
  Deploy: '#1f1a16',
};

const stageTextColors: Record<(typeof spine)[number]['stage'], string> = {
  Foundation: '#4a3a1f',
  Build: '#163f3e',
  Translate: '#523107',
  Apply: '#53200b',
  Deploy: '#fffdf9',
};

export function StudioSpineMap() {
  return (
    <div className="studio-spine-map">
      <div className="studio-spine-map__grid">
        {spine.map((item, index) => (
          <article className="studio-spine-map__card" key={item.course}>
            <div className="studio-spine-map__card-top">
              <span className="studio-spine-map__index">{String(index + 1).padStart(2, '0')}</span>
              <span className="studio-spine-map__year">{item.year}</span>
              <span
                className="studio-spine-map__stage"
                style={{ backgroundColor: stageColors[item.stage], color: stageTextColors[item.stage] }}
              >
                {item.stage}
              </span>
            </div>
            <h3 className="studio-spine-map__course">{item.course}</h3>
            <p className="studio-spine-map__title">{item.title}</p>
            <p className="studio-spine-map__outcome">{item.outcome}</p>
            <span
              className={`studio-spine-map__status studio-spine-map__status--${item.status}`}
            >
              {item.status === 'approved' ? 'Approved' : 'Proposed title'}
            </span>
          </article>
        ))}
      </div>
    </div>
  );
}
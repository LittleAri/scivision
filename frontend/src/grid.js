import { Link } from "react-router-dom";

import { React } from 'react';

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { Row, Col, Card } from "react-bootstrap";

import datasources from './data/datasources.json';
import models from './data/models.json';
import projects from './data/projects.json';

import {
    model_thumbnails, 
    datasource_thumbnails, 
    project_thumbnails
} from "./thumbnails.js"

import { TaskBadge, UsageBadge } from './badges.js'

// returns a function component, for a Popover describing the current
// resource (model or datasource).  Assumes it has name, description,
// and tasks properties.
//
// * data - the model or datasource
export function makePopover(data) {
    return (props) => (
        <Popover id="popover-basic" {...props}>
            <Popover.Content>
                <strong>{data.name}</strong> {data.description} &nbsp;
                {data.tasks.map((t) => <TaskBadge key= {t} taskName={t} />)}
                {<UsageBadge usageBool={data.scivision_usable} />}
            </Popover.Content>
        </Popover>
    );
}

// Curried function for making thumbnail
// * getThumbnail - a function from data to the (path to the)
//   corresponding thumbnail image
// * getLink - a function from data to a link to information about the
//   resource represented by data (that is, if data is a model,
//   getLink(data) is the model card page for that model)
// * data - the model or datasource
// * doPopover - boolean, add an overlay trigger with some pop up text?
//   In this case, data must have a 'tasks' member
// * asCard - wrap the thumbnail in 'card' and 'card-body' divs?
export function makeThumbnail({getThumbnail, getLink, doPopover, asCard}) {
    return function (data) {
        const thumbnail_src = getThumbnail(data);
        const thumbnail_resource_link = getLink(data);
        let thumbnail;
        if (thumbnail_src === undefined) {
            thumbnail = (
                <svg width="100%" height="auto" role="img" style={{ aspectRatio: 1 }}>
                    <rect width="100%" height="100%" fill="#6f6f6f"></rect>
                    <text x="50%" y="50%" fill="white"
                          textAnchor="middle" dominantBaseline="middle"
                          fontSize="10pt">
                        {data.name}
                    </text>
                </svg>
            );
        } else {
            thumbnail = <Card.Img variant="top"
                             src={thumbnail_src}
                             alt={data.name}
                />
        }

        // Add popover
        if (doPopover && doPopover !== undefined) {
            thumbnail = (
                <OverlayTrigger
                    overlay={makePopover(data)}
                    placement="auto">
                    {thumbnail}
                </OverlayTrigger>
            )
        // Where no popover, thumnail includes description as text below
        } else {
            // Add a full stop if the description doesn't have one
            let fstop;
            if (data.description.slice(-1) !== '.'){
              fstop = '.';
            } else {
              fstop = '';
            }
            thumbnail = (
              <div>
                {thumbnail}
                <div className="gridtext">
                <p></p>
                {data.description}
                {fstop}
                </div>
              </div>
            )
        }

        // Add card formatting
        if (asCard && asCard !== undefined) {
            thumbnail = (
                <Card>
                    <Card.Body>
                        {thumbnail}
                    </Card.Body>
                </Card>
            )
        }


        return (
            <Col className="mb-3">
                  <Link to={thumbnail_resource_link} key = {data.name}>
                      {thumbnail}
                  </Link>
            </Col>
        );
    }
}

// Component: Models, thumbnail grid view
// route: /model-grid
export function ModelGrid() {
    const image_cards = models.entries.map(
                makeThumbnail({
                    getThumbnail: (model) => model_thumbnails[`./${model.name}.jpg`],
                    getLink: (model) => "/model/" + encodeURIComponent(model.name),
                    doPopover: true,
                    asCard: true
                })
    );

    return (
        <Row xs={1} md={2} lg={3} xl={4}>
            {image_cards}
        </Row>
    );
}


// Component: Datasources, thumbnail grid view
// route: /datasource-grid
export function DatasourceGrid() {
    const image_cards = datasources.entries.map(
        makeThumbnail({
            getThumbnail: (datasource) => datasource_thumbnails[`./${datasource.name}.jpg`],
            getLink: (datasource) => "/datasource/" + encodeURIComponent(datasource.name),
            doPopover: true,
            asCard: true
        })
    );

    return (
        <Row xs={1} md={2} lg={3} xl={4}>
            {image_cards}
        </Row>
    );
}


// Component: Projects, thumbnail grid view
// route: /project-grid
export function ProjectGrid() {
    const image_cards = projects.entries.map(
        makeThumbnail({
            getThumbnail: (project) => project_thumbnails[`./${project.name}.jpg`],
            getLink: (project) => "/project/" + encodeURIComponent(project.name),
            doPopover: false,
            asCard: true
        })
    );

    return (
        <Row xs={1} md={2} lg={3} xl={4}>
            {image_cards}
        </Row>
    );
}

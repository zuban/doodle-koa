import Koa from 'koa'
import Router from 'koa-router'
import {readJSON, writeJSON} from './json'
import uuid from 'node-uuid';
import parser from 'koa-bodyparser'
import logger from 'koa-logger';
import convert from 'koa-convert';
import serve from 'koa-static';
import send from 'koa-send'
import cors from 'koa-cors'
import historyApiFallback from 'koa-history-api-fallback';
const router = new Router();
const app = new Koa();

app.use(logger());
app.use(parser());


const daydiff = (date1, date2) => {

    // The number of milliseconds in one day
    let ONE_DAY = 1000 * 60 * 60 * 24;

    // Convert both dates to milliseconds
    let date1_ms = date1.getTime();
    let date2_ms = date2.getTime();

    // Calculate the difference in milliseconds
    let difference_ms = Math.abs(date1_ms - date2_ms)

    // Convert back to days and return
    return Math.floor(difference_ms / ONE_DAY) + 1;

}

const getInterval = (startDate, endDate, qn) => {
    if (startDate === endDate) {
        let period = (1440 / qn); //24* 60
        let periodsArray = [];
        for (let i = 1; i < qn; i++) {
            let hours = Math.floor(Math.round(period) * i / 60);
            let minutes = Math.floor(Math.abs(period * i - hours * 60));
            if (minutes < 10) {
                minutes += `${minutes}`;
            }
            periodsArray.push(`${hours}:${minutes}`);
        }
        return periodsArray;
    }
    else {
        try {
            let diff = daydiff(new Date(startDate), new Date(endDate));
            console.log(diff);
            let period = (1440 / qn);
            let periodsArray = [];
            for (let j = 0; j < diff + 1; j++) {
                for (let i = 1; i < qn; i++) {
                    let hours = Math.floor(Math.round(period) * i / 60);
                    let minutes = Math.floor(Math.abs(period * i - hours * 60));
                    if (minutes < 10) {
                        minutes += `${minutes}`;
                    }
                    periodsArray.push(`${hours}:${minutes}`);
                }
            }
            return periodsArray;
        }
        catch (e) {
            console.log(e);
        }
    }
}

router
    .get('/api/:id', async(ctx) => {
        try {
            ctx.body = await readJSON(`./store/${ctx.params.id}.json`);
        } catch (e) {
            ctx.status = 404;
        }
    })
    .post('/api/create', async(ctx) => {
        try {
            let id = uuid.v1();
            ctx.body = id;
            let body = ctx.request.body;

            console.log('start date')
            console.log(new Date(body.startDate));
            console.log('end date')
            console.log(new Date(body.endDate))
            console.log('diff')
            console.log(daydiff(new Date(body.startDate), new Date(body.endDate)));
            console.log('qn')
            console.log(body.quantity);
            body.intervals = getInterval(
                body.startDate,
                body.endDate,
                body.quantity);

            if (body.startDate != body.endDate) {
                let diff = daydiff(new Date(body.startDate), new Date(body.endDate));
                body.quantity = (diff + 1) * (body.quantity - 1);
            }
            else {
                body.quantity = body.quantity - 1;
            }
            body.id = id;
            body.users = [];
            await writeJSON(`./store/${id}.json`, JSON.stringify(body));
        } catch (e) {
            ctx.status = 500;
        }
    })
    .post('/api/:id', async(ctx) => {
        try {
            let user = ctx.request.body;
            let temp = await readJSON(`./store/${ctx.params.id}.json`);
            temp.users.push(user);
            ctx.body = temp;
            await writeJSON(`./store/${ctx.params.id}.json`, JSON.stringify(temp));
        } catch (e) {
            ctx.status = 500;
        }
    });
app.use(router.routes());

app.use(convert(historyApiFallback()));
app.use(convert(cors()));
app.use(convert(serve('./frontend/public/')));
app.listen(80, () => console.log('server started 3000'));

export default app;

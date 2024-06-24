-- get superuser id
    select *
    from user
    where username = 'superuser';


-- find workouts that are related to a specific session
select *
from workout
where session_id = 'clxs06mt20005xq09q7qa5r8k'

select *
from session;

-- I want all of the sessions that are related to specific user and that are not connected to the current active routine
select *
from session as s
left join routine as r
on s.routine_id = r.id
where s.user_id = 'clw3v31uo00005hyignh0oukl'
AND s.routine_id IS NULL OR
    s.routine_id != (select id from routine where r.is_active = true and r.id = 'clw3v31uo00005hyignh0oukl')


select session_days_active.day
from session
left join session_days_active
on session.id = session_days_active.session_id
where session.name LIKE 'hi';


-- get a list of all sessions that are related to a active routine
select *
from routine
left join session
on routine.id = session.routine_id
left join session_days_active
on session.id = session_days_active.session_id
where routine.is_active = true and routine.user_id = 'clxdwza5y0000yvj767cykl92'


-- get a session with all related workouts
select *
from session
left join workout
on session.id = workout.session_id
where session.user_id = 'clx6v20pe0000k8dxf46pewgo'

-- select all on active sessions
select *
from active_session;
-- delete specific session in active sessions
delete from active_session
where id = 'clxs9l8sd0026xq09st37jmf2';

-- get workouts
select *
from workout
where session_id = 'clxrzpbrl0008102ikebt1nro';

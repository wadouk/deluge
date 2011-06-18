list="
select *, datediff(dafter,dbefore)/7 ddiff, vafter-vbefore vdiff, datediff(dafter,now()) nb_jours_last  from (
select b.d dbefore, b.v vbefore, a.d dafter, a.v vafter 
from (
SELECT @rownumb := @rownumb+1 rownumb, 
	t.* 
	FROM (select @rownumb := 1) r, (select date as d, max(volume) as v 
	 from releves 
	group by date 
	 order by date desc ) t
) a join
(
SELECT @rownuma := @rownuma+1 rownuma, t.* 
FROM (select @rownuma := 0) r, (select date as d, max(volume) as v 
	 from releves 
	group by date 
	 order by date desc ) t
) b
on rownumb = rownuma
) g"

prix="
select volume, date, datediff('2012-04-29', date)/7 as toend, 
'2012-04-29' end, 
2.09 as price, 
46 co_jardinier
from releves 
where date in 
	(select max(date) from releves)
limit 1"

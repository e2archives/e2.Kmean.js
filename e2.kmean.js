(function(e2,undefined){

e2.Kmean = Kmean

function Kmean(options)
{
	var count = 0
	var maxIteration = options.maxIteration || 5

	var array = options.data
	var center = options.center || estimateCluster(array), lastState
	var distanceFunc = options.distanceFunc || euclidean_distance
	
	while(true)
	{
		var res = assign(center, array, distanceFunc, lastState)
		if (!res) break
		lastState = res
		center = update(center, array, lastState)
		if (count++ >= maxIteration) break
	}
	
	return {center:center,data:array,tag:lastState}
}	

function estimateCluster(array)
{
	var center = []
	var n = numCluster(array)
	var step = parseInt(array.length/(n+1)), count = 0
	for (var i=0; i<n; i++)
	{
		center.push(clone(array[count]))
		count += step
	}
	
	return center
}

function numCluster(array)
{
	return parseInt(Math.sqrt(array.length/2))
}

function tagData(array)
{
	for (var i=0,len=array.length; i<len; i++)
		array[i]._count = 1
		
	return array
}

function assign(center, array, distanceFunc, lastState)
{
	var newArray = true, allsame = true
	
	if (lastState) newArray = false
	else allsame = false
	
	lastState = lastState || []

	for (var i=0,len=array.length; i<len; i++)
	{
		var min = Number.MAX_VALUE, minNode = 0 
		for (var j=0,lenj=center.length; j<lenj; j++)
		{
			var d = distanceFunc(center[j],array[i])
			if (d < min) 
			{
				min = d
				minNode = j
			}
		}
		if (newArray) 
		{
			lastState.push(minNode)
			continue
		}
		
		if (lastState[i] != minNode) allsame = false
		lastState[i] = minNode
		
	}
	

	if (allsame) return false
	return lastState

}

function update(center, array, lastState)
{
	// clear
	center = clearCenter(center)
	var count = []
	for (var j=0,lenj=center.length; j<lenj; j++) count.push[0]

	for (var i=0,len=array.length; i<len; i++)
	{
		center[lastState[i]] = add(center[lastState[i]],array[i])
		console.log(center[lastState[i]])
		count[lastState[i]]++
	}
	
	for (var j=0,lenj=center.length; j<lenj; j++)
		center[lastState[i]] = divide(center[lastState[i]],count[lastState[i]])

	return center
}

function emptyObj(sample)
{
	var res = {}
	
	for (field in sample) res[field] = 0

	return res
}

function clearCenter(center)
{
	var tmp = emptyObj(center[0])
	for (var j=0,lenj=center.length; j<lenj; j++)
	{	
		center[j] = {}
	}
	
	return center
}

function euclidean_distance(pt1, pt2)
{
	var d = 0
	for (key in pt1)
	{
		d += (pt2[key] - pt1[key]) * (pt2[key] - pt1[key])
	}
	
	return d
}

function add(pt1, pt2)
{
	var res = {}
	for (key in pt2)
	{
		res[key] = pt1[key] || 0 + pt2[key]
	}
	
	return res
}

function divide(pt,divisor)
{
	if (divisor == 0) return pt
	for (key in pt)
	{
		pt[key] /= divisor
	}
	return pt
}

function clone(pt)
{
	var pt_new = {}
	for (key in pt)
	{
		pt_new[key] = pt[key]
	}
	return pt_new
}


})(window.e2 = window.e2 || {})
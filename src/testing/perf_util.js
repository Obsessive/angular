'use strict';"use strict";
var e2e_util_1 = require('./e2e_util');
exports.verifyNoBrowserErrors = e2e_util_1.verifyNoBrowserErrors;
var benchpress = global['benchpress'];
var bind = benchpress.bind;
var Options = benchpress.Options;
function runClickBenchmark(config) {
    browser.ignoreSynchronization = !config.waitForAngular2;
    var buttons = config.buttons.map(function (selector) { return $(selector); });
    config.work = function () { buttons.forEach(function (button) { button.click(); }); };
    return runBenchmark(config);
}
exports.runClickBenchmark = runClickBenchmark;
function runBenchmark(config) {
    return getScaleFactor(browser.params.benchmark.scaling)
        .then(function (scaleFactor) {
        var description = {};
        var urlParams = [];
        if (config.params) {
            config.params.forEach(function (param) {
                var name = param.name;
                var value = applyScaleFactor(param.value, scaleFactor, param.scale);
                urlParams.push(name + '=' + value);
                description[name] = value;
            });
        }
        var url = encodeURI(config.url + '?' + urlParams.join('&'));
        return browser.get(url).then(function () {
            return global['benchpressRunner'].sample({
                id: config.id,
                execute: config.work,
                prepare: config.prepare,
                microMetrics: config.microMetrics,
                bindings: [bind(Options.SAMPLE_DESCRIPTION).toValue(description)]
            });
        });
    });
}
exports.runBenchmark = runBenchmark;
function getScaleFactor(possibleScalings) {
    return browser.executeScript('return navigator.userAgent')
        .then(function (userAgent) {
        var scaleFactor = 1;
        possibleScalings.forEach(function (entry) {
            if (userAgent.match(entry.userAgent)) {
                scaleFactor = entry.value;
            }
        });
        return scaleFactor;
    });
}
function applyScaleFactor(value, scaleFactor, method) {
    if (method === 'log2') {
        return value + Math.log(scaleFactor) / Math.LN2;
    }
    else if (method === 'sqrt') {
        return value * Math.sqrt(scaleFactor);
    }
    else if (method === 'linear') {
        return value * scaleFactor;
    }
    else {
        return value;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyZl91dGlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlmZmluZ19wbHVnaW5fd3JhcHBlci1vdXRwdXRfcGF0aC1YUFFTWHp3NS50bXAvYW5ndWxhcjIvc3JjL3Rlc3RpbmcvcGVyZl91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx5QkFBb0MsWUFBWSxDQUFDO0FBQXpDLGlFQUF5QztBQUVqRCxJQUFJLFVBQVUsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDdEMsSUFBSSxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztBQUMzQixJQUFJLE9BQU8sR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDO0FBRWpDLDJCQUFrQyxNQUFNO0lBQ3RDLE9BQU8sQ0FBQyxxQkFBcUIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUM7SUFDeEQsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBUyxRQUFRLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdFLE1BQU0sQ0FBQyxJQUFJLEdBQUcsY0FBYSxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BGLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDOUIsQ0FBQztBQUxlLHlCQUFpQixvQkFLaEMsQ0FBQTtBQUVELHNCQUE2QixNQUFNO0lBQ2pDLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO1NBQ2xELElBQUksQ0FBQyxVQUFTLFdBQVc7UUFDeEIsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNuQixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNsQixNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFTLEtBQUs7Z0JBQ2xDLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7Z0JBQ3RCLElBQUksS0FBSyxHQUFHLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDcEUsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDO2dCQUNuQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO1lBQzVCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUNELElBQUksR0FBRyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDNUQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQzNCLE1BQU0sQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxNQUFNLENBQUM7Z0JBQ3ZDLEVBQUUsRUFBRSxNQUFNLENBQUMsRUFBRTtnQkFDYixPQUFPLEVBQUUsTUFBTSxDQUFDLElBQUk7Z0JBQ3BCLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTztnQkFDdkIsWUFBWSxFQUFFLE1BQU0sQ0FBQyxZQUFZO2dCQUNqQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQ2xFLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDVCxDQUFDO0FBeEJlLG9CQUFZLGVBd0IzQixDQUFBO0FBRUQsd0JBQXdCLGdCQUFnQjtJQUN0QyxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyw0QkFBNEIsQ0FBQztTQUNyRCxJQUFJLENBQUMsVUFBUyxTQUFpQjtRQUM5QixJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUM7UUFDcEIsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFVBQVMsS0FBSztZQUNyQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLFdBQVcsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQzVCLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxXQUFXLENBQUM7SUFDckIsQ0FBQyxDQUFDLENBQUM7QUFDVCxDQUFDO0FBRUQsMEJBQTBCLEtBQUssRUFBRSxXQUFXLEVBQUUsTUFBTTtJQUNsRCxFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztRQUN0QixNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNsRCxDQUFDO0lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzdCLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQy9CLE1BQU0sQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDO0lBQzdCLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDZixDQUFDO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB7dmVyaWZ5Tm9Ccm93c2VyRXJyb3JzfSBmcm9tICcuL2UyZV91dGlsJztcblxudmFyIGJlbmNocHJlc3MgPSBnbG9iYWxbJ2JlbmNocHJlc3MnXTtcbnZhciBiaW5kID0gYmVuY2hwcmVzcy5iaW5kO1xudmFyIE9wdGlvbnMgPSBiZW5jaHByZXNzLk9wdGlvbnM7XG5cbmV4cG9ydCBmdW5jdGlvbiBydW5DbGlja0JlbmNobWFyayhjb25maWcpIHtcbiAgYnJvd3Nlci5pZ25vcmVTeW5jaHJvbml6YXRpb24gPSAhY29uZmlnLndhaXRGb3JBbmd1bGFyMjtcbiAgdmFyIGJ1dHRvbnMgPSBjb25maWcuYnV0dG9ucy5tYXAoZnVuY3Rpb24oc2VsZWN0b3IpIHsgcmV0dXJuICQoc2VsZWN0b3IpOyB9KTtcbiAgY29uZmlnLndvcmsgPSBmdW5jdGlvbigpIHsgYnV0dG9ucy5mb3JFYWNoKGZ1bmN0aW9uKGJ1dHRvbikgeyBidXR0b24uY2xpY2soKTsgfSk7IH07XG4gIHJldHVybiBydW5CZW5jaG1hcmsoY29uZmlnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJ1bkJlbmNobWFyayhjb25maWcpIHtcbiAgcmV0dXJuIGdldFNjYWxlRmFjdG9yKGJyb3dzZXIucGFyYW1zLmJlbmNobWFyay5zY2FsaW5nKVxuICAgICAgLnRoZW4oZnVuY3Rpb24oc2NhbGVGYWN0b3IpIHtcbiAgICAgICAgdmFyIGRlc2NyaXB0aW9uID0ge307XG4gICAgICAgIHZhciB1cmxQYXJhbXMgPSBbXTtcbiAgICAgICAgaWYgKGNvbmZpZy5wYXJhbXMpIHtcbiAgICAgICAgICBjb25maWcucGFyYW1zLmZvckVhY2goZnVuY3Rpb24ocGFyYW0pIHtcbiAgICAgICAgICAgIHZhciBuYW1lID0gcGFyYW0ubmFtZTtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IGFwcGx5U2NhbGVGYWN0b3IocGFyYW0udmFsdWUsIHNjYWxlRmFjdG9yLCBwYXJhbS5zY2FsZSk7XG4gICAgICAgICAgICB1cmxQYXJhbXMucHVzaChuYW1lICsgJz0nICsgdmFsdWUpO1xuICAgICAgICAgICAgZGVzY3JpcHRpb25bbmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdXJsID0gZW5jb2RlVVJJKGNvbmZpZy51cmwgKyAnPycgKyB1cmxQYXJhbXMuam9pbignJicpKTtcbiAgICAgICAgcmV0dXJuIGJyb3dzZXIuZ2V0KHVybCkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gZ2xvYmFsWydiZW5jaHByZXNzUnVubmVyJ10uc2FtcGxlKHtcbiAgICAgICAgICAgIGlkOiBjb25maWcuaWQsXG4gICAgICAgICAgICBleGVjdXRlOiBjb25maWcud29yayxcbiAgICAgICAgICAgIHByZXBhcmU6IGNvbmZpZy5wcmVwYXJlLFxuICAgICAgICAgICAgbWljcm9NZXRyaWNzOiBjb25maWcubWljcm9NZXRyaWNzLFxuICAgICAgICAgICAgYmluZGluZ3M6IFtiaW5kKE9wdGlvbnMuU0FNUExFX0RFU0NSSVBUSU9OKS50b1ZhbHVlKGRlc2NyaXB0aW9uKV1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0U2NhbGVGYWN0b3IocG9zc2libGVTY2FsaW5ncykge1xuICByZXR1cm4gYnJvd3Nlci5leGVjdXRlU2NyaXB0KCdyZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudCcpXG4gICAgICAudGhlbihmdW5jdGlvbih1c2VyQWdlbnQ6IHN0cmluZykge1xuICAgICAgICB2YXIgc2NhbGVGYWN0b3IgPSAxO1xuICAgICAgICBwb3NzaWJsZVNjYWxpbmdzLmZvckVhY2goZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgICAgICBpZiAodXNlckFnZW50Lm1hdGNoKGVudHJ5LnVzZXJBZ2VudCkpIHtcbiAgICAgICAgICAgIHNjYWxlRmFjdG9yID0gZW50cnkudmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHNjYWxlRmFjdG9yO1xuICAgICAgfSk7XG59XG5cbmZ1bmN0aW9uIGFwcGx5U2NhbGVGYWN0b3IodmFsdWUsIHNjYWxlRmFjdG9yLCBtZXRob2QpIHtcbiAgaWYgKG1ldGhvZCA9PT0gJ2xvZzInKSB7XG4gICAgcmV0dXJuIHZhbHVlICsgTWF0aC5sb2coc2NhbGVGYWN0b3IpIC8gTWF0aC5MTjI7XG4gIH0gZWxzZSBpZiAobWV0aG9kID09PSAnc3FydCcpIHtcbiAgICByZXR1cm4gdmFsdWUgKiBNYXRoLnNxcnQoc2NhbGVGYWN0b3IpO1xuICB9IGVsc2UgaWYgKG1ldGhvZCA9PT0gJ2xpbmVhcicpIHtcbiAgICByZXR1cm4gdmFsdWUgKiBzY2FsZUZhY3RvcjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbn1cbiJdfQ==